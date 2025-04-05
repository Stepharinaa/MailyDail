import { useState, useEffect } from "react"
import { updateVotesByCommentID } from "../utils/api"
import LoadingAnimation from "./LoadingAnimation"

function CommentVotesButton({commentID, currentVotes}) {
    const [votes, setVotes] = useState(currentVotes)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setVotes(currentVotes);
    }, [currentVotes])

    const handleVote = (voteChange) => {
        setVotes((previousVotes) => previousVotes + voteChange)
        setError(null)
        setIsLoading(true)

        updateVotesByCommentID(commentID, voteChange)
          .then((updatedComment) => {
            setVotes(updatedComment.votes)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Vote update failed:", error)
            setError("Your vote was not successful. Please try again!")
            setIsLoading(false)
          })
          if (isLoading) return <LoadingAnimation />;
          if (error) return <p className="error-message">{error}</p>
        }

        return(
            <div className="comment-vote-container"> 
                <button className="comment-vote-button" onClick={() => handleVote(1)}>👍</button>
                <p className="vote-count">Votes: {votes}</p>
                <button className="comment-vote-button" onClick={() => handleVote(-1)}>👎</button>
            </div>
        )
}

export default CommentVotesButton