import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";
import topicPlaceholderImage from "../assets/topic-placeholder-image.webp";
import LoadingAnimation from "../Components/LoadingAnimation";
import { useNavigate } from "react-router-dom";

function AllTopicsPage() {
  let navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        if (error.response && error.response.status === 404) {
          setError("Oops! The topic you're looking for doesn't exist.");
        } else {
          setError("Error fetching topic. Please try again!");
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section
      className="topics-container"
      role="region"
      aria-labelledby="topics-heading"
    >
      <div className="header-row">
        <h1 id="topics-heading">Topics</h1>
        <button
          id="post-button"
          onClick={() => navigate("/topics/create")}
          aria-label="Post a new topic"
        >
          ➕ Post a New Topic
        </button>
      </div>
      {topics.length === 0 ? (
        <p role="status">No topics found.</p>
      ) : (
        <div className="topics-grid">
          {topics.map((topic) => (
            <Link
              to={`/topics/${topic.slug}`}
              key={topic.slug}
              className="topic-card"
              aria-label={`View articles about ${topic.slug}`}
            >
              <div className="topic-image-wrapper">
                <img
                  src={topic.img_url || topicPlaceholderImage}
                  alt={`Image representing ${topic.slug}`}
                  className="topic-image"
                />
              </div>
              <div className="topic-content">
                <p>{topic.description}</p>
                <h3 className="topic-title">{topic.slug}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllTopicsPage;
