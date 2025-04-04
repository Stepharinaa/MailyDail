import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { fetchTopics } from "../utils/api"
import topicPlaceholderImage from "../assets/topic-placeholder-image.jpg"
import LoadingAnimation from "../Components/LoadingAnimation"

function AllTopicsPage() {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        fetchTopics()
        .then((data) => {
          setTopics(data);
          setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching topics:", error)
            if (error.response && error.response.status === 404) {
              setError("Oops! The topic you're looking for doesn't exist.")
            } else {
            setError("Error fetching topic. Please try again!")
            }
            setIsLoading(false);
        })
    }, []) 

    if (isLoading) return <LoadingAnimation />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <section className="topics-container">
          <h1>Topics</h1>
          {topics.length === 0 ? (<p>No topics found.</p>) : (
            <div className="topics-grid">
              {topics.map((topic) => (
                <Link to={`/topics/${topic.slug}`} key={topic.slug} className="topic-card">
                  <div className="topic-image-wrapper">
                  <img
                  src={topic.img_url || topicPlaceholderImage}
                  alt={topic.slug}
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

export default AllTopicsPage