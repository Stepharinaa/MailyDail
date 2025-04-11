import { useState, useEffect } from "react";
import { updateVotesOnArticle } from "../utils/api";
import { TiArrowDownOutline } from "react-icons/ti";
import { TiArrowUpOutline } from "react-icons/ti";

function ArticleVotesButton({ articleID, currentVotes }) {
  const [votes, setVotes] = useState(currentVotes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setVotes(currentVotes);
  }, [currentVotes]);

  const handleVote = (voteChange) => {
    setVotes((previousVotes) => previousVotes + voteChange);
    setError(null);
    setIsLoading(true);

    updateVotesOnArticle(articleID, voteChange)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Vote update failed:", error);
        setError("Your vote was not successful. Please try again!");
        setIsLoading(false);
      });

    if (isLoading) return <p>Loading votes...</p>;
  };

  return (
    <div className="vote-container">
      <button className="vote-button" onClick={() => handleVote(1)}>
        <TiArrowUpOutline className="vote-icon" />
      </button>
      <p className="vote-count">{votes}</p>
      <button className="vote-button" onClick={() => handleVote(-1)}>
        <TiArrowDownOutline className="vote-icon" />
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ArticleVotesButton;
