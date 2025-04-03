import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { fetchTopics } from "../utils/api"
import topicPlaceholderImage from "../assets/topic-placeholder-image.jpg"

function AllTopicsPage() {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetchTopics()
        .then((data) => {
            setTopics(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching topics:", error)
            setError("Failed to load topics. Please try again!")
            setIsLoading(false)
        })
    }, []) 


    return (
        <section className="topics-container">
          <h1>Topics</h1>
          {error && <p className="error-message">{error}</p>}
          {isLoading ? (
            <p>Loading topics...</p>
          ) : (
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
                    <p className="topic-description">{topic.description}</p>
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