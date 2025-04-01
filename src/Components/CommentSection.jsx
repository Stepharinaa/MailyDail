import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import { fetchCommentsByArticleID, postCommentByArticleID } from "../utils/api"

function CommentSection() {
  const {article_id} = useParams()
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false)

    useEffect(() => {
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
        postCommentByArticleID(article_id, { username: "grumpy19", body: newComment})
        .then((comment) => {
            setComments((previousComments) => [comment, ...previousComments])
            setNewComment("")
        })
        .catch((error) => {
            console.error("Error posting comment", error)
        })
        .finally(() => {
            setIsPosting(false)
        })
    }

return (
    <section className="comment-section">
        <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(element) => setNewComment(element.target.value)}
          placeholder="Add comment here..."
          required
        />
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Posting..." : "Add Comment"}
        </button>
        </form>
        <h3>Comments</h3>
        <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.comment_id} className="comment">
              <p>{comment.author}: </p>
               <p>{comment.body}</p>
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