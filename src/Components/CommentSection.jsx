import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import { fetchCommentsByArticleID, postCommentByArticleID, deleteCommentByCommentID } from "../utils/api"
import timeAgo from "../utils/formatTimeToNow";
import CommentVotesButton from "./CommentVotesButton";
import DeleteCommentButton from "./DeleteCommentButton";

function CommentSection() {
  const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false)
    const [isDeleting, setIsDeleting] = useState({})
    const [confirmationMessage, setConfirmationMessage] = useState(null)
    const [error, setError] = useState(null)
    const currentUser = "grumpy19"

    useEffect(() => {
      setIsLoading(true)
        fetchCommentsByArticleID(article_id)
        .then((data) => {
            setComments(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching comments:", error)
            setIsLoading(false)
        })
    } ,[article_id])

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        if (!newComment.trim()) return;

        setIsPosting(true)
        postCommentByArticleID(article_id, { username: currentUser, body: newComment})
        .then((comment) => {
          const commentWithAuthor = {...comment, author: currentUser};
            setComments((previousComments) => [commentWithAuthor, ...previousComments])
            setNewComment("")
            setConfirmationMessage("Your message has been posted!")
        })
        .catch((error) => {
            console.error("Error posting comment", error)
            setError("Your comment could not be posted. Please try again!")
        })
        .finally(() => {
            setIsPosting(false)
        })
    }
    
    const handleDeleteComment = (comment_id) => {
      setIsDeleting((previousComments) => ({ ...previousComments, [comment_id]: true}))

      const filteredOutComments = comments.filter(comment => comment.comment_id !== comment_id)
      setComments(filteredOutComments)

      deleteCommentByCommentID(comment_id)
      .then(() => {
        setConfirmationMessage("Comment deleted successfully")
      }).catch((error) => {
        console.error("Error deleting comment", error)
        setError("Your comment could not be deleted. Please try again!")
        setComments((previousComments) => [...previousComments, filteredOutComments])
      })
      .finally(() => {
        setIsDeleting((previousComments) => ({...previousComments, [comment_id] : false}))
      })
    }
    if (error) return <p className="error-message">{error}</p>
return (
    <section className="comment-section">
        <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea id="add-comment-here"
          value={newComment}
          onChange={(element) => setNewComment(element.target.value)}
          placeholder=" Add comment here..."
          required
        />
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Posting..." : "Add Comment"}
        </button>
        </form>
        {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        <h2 id="comments-header">Comments</h2>
        <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.comment_id} className="comment">
              <div className="comment-header">
              <p id="comment-author">{comment.author}: </p>
              <p id="comment-timestamp">{timeAgo(comment.created_at)}</p>
              </div>
               <p className="comment">{comment.body}</p>
               <CommentVotesButton commentID={comment.comment_id} currentVotes={comment.votes}/>

               {comment.author === currentUser && (
                <DeleteCommentButton
                  onDelete={() => handleDeleteComment(comment.comment_id)} 
                  isDeleting={isDeleting[comment.comment_id]} 
                />
              )}  

            </li>
          ))
        ) : (
          <p>No comments yet. 🙁 Be the first to comment!</p>
        )}
      </ul>
    </section>
)
}

export default CommentSection