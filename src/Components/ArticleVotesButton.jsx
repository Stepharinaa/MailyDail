import {useState, useEffect} from "react"
import { updateVotesOnArticle } from "../utils/api"

function ArticleVotesButton({articleID, currentVotes}) {
    const [votes, setVotes] = useState(currentVotes)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setVotes(currentVotes);
    }, [currentVotes]);

    const handleVote = (voteChange) => {
        setVotes((previousVotes) => previousVotes + voteChange)
        setError(null)
        setIsLoading(true)

        updateVotesOnArticle(articleID, voteChange)
          .then((updatedArticle) => {
            setVotes(updatedArticle.votes)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Vote update failed:", error)
            setError("Your vote was not successful. Please try again!")
            setIsLoading(false)
          })
          if (isLoading) return <p>Loading votes...</p>
        }

    return(
        <div>
            <p>Votes: {votes} </p>
            <button className="votes-box" onClick={() => handleVote(1)}>👍</button>
            <button className="votes-box" onClick={() => handleVote(-1)}>👎</button>
            {error && <p id="error-message">{error}</p>}
        </div>
    )
}

export default ArticleVotesButton