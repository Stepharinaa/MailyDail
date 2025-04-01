import { useState} from 'react'

function AllArticlesSearchBar({ onSortChange, onTopicChange, topics}) {
    const [sortBy, setSortBy] = useState("created_at")
    const [topic, setTopic] = useState("")

    const handleSortChange = (event) => {
        const newSortBy = event.target.value
        setSortBy(newSortBy)
        onSortChange(newSortBy)
    }

    const handleTopicChange = (event) => {
        const newTopic = event.target.value;
        setTopic(newTopic);
        onTopicChange(newTopic);
    }

    return (
        <div className="all-articles-bar">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
    
          <label htmlFor="topic-filter">Filter by Topic:</label>
          <select id="topic-filter" value={topic} onChange={handleTopicChange}>
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

export default AllArticlesSearchBar;