import {useState} from "react"
import { updateVotesOnArticle } from "../utils/api"

function ArticleVotesButton({articleID, currentVotes}) {
    const [votes, setVotes] = useState(currentVotes)
    const [isLoading, setIsLoading] = useState(false)

    const handleVote = (voteChange) => {
        setIsLoading(true)
        console.log("Article ID:", articleID);
        updateVotesOnArticle(articleID, voteChange)
          .then((updatedArticle) => {
            setVotes(updatedArticle.votes)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Vote update failed:", error)
            setIsLoading(false)
          })
          if (isLoading) return <p>Loading votes...</p>
        }

    return(
        <div>
            <p>Votes: {votes} </p>
            <button onClick={() => handleVote(1)}>👍</button>
            <button onClick={() => handleVote(-1)}>👎</button>
        </div>
    )
}

export default ArticleVotesButton