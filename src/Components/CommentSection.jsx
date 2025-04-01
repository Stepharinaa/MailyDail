import {useState, useEffect} from "react"
import { fetchCommentsByArticleID, postCommentByArticleID } from "../utils/api"

function CommentSection({articleID}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isPosting, setIsPosting] = useState(false)

    useEffect(() => {
        fetchCommentsByArticleID()
        .then((data) => {
            setComments(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching comments:", error)
            setIsLoading(false)
        })
    } ,[articleID])

    const handleCommentSubmit = (event) => {
        event.preventDefault()

        setIsPosting(true)
        postCommentByArticleID(articleID, { username: "grumpy19", body: newComment})
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
              <p>{comment.author}: {comment.body}</p>
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