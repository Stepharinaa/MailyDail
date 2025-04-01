import { useState} from 'react'
import { fetchTopics } from '../utils/api'

function AllArticlesBar({ setSortBy, setTopic}) {
const [topics, setTopics] = useState([])

useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

    return (
        <div className="all-articles-bar">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" onChange={(element) => setSortBy(element.target.value)}>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
    
          <label htmlFor="topic-filter">Filter by Topic:</label>
          <select id="topic-filter" onChange={(element) => setTopic(element.target.value)}>
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        </div>
      );
} 

export default AllArticlesBar;