import { useState, useEffect} from 'react'
import { fetchTopics } from '../utils/api'

function FilterByTopicBar({ setTopic }) {
const [topics, setTopics] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setIsLoading(false)
      });
  }, []);

    return (
        <div className="topic-bar">
          <label htmlFor="topic-filter">Filter by Topic:</label>
          {isLoading ? (
        <p>Loading topics...</p>
      ) : (
        <select id="topic-filter" onChange={(element) => setTopic(element.target.value)}>
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
      )}
    </div>
      );
} 

export default FilterByTopicBar;