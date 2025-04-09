import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api";

function FilterByTopicBar({ topic, setTopic }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const newTopic = event.target.value;
    setTopic(newTopic);
  };

  return (
    <div className="topic-bar">
      <label htmlFor="topic-filter" className="sr-only">
        Filter by topic
      </label>
      {isLoading ? (
        <p>Loading topics...</p>
      ) : (
        <select id="topic-filter" value={topic} onChange={handleChange}>
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
