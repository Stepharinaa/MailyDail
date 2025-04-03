import { useState } from 'react';

function SortByBox({ onSortChange }) {
  const [sortBy, setSortBy] = useState("created_at");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className="sort-by-bar">
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Most Recent</option>
        <option value="votes">Most Votes</option>
        <option value="comment_count">Most Comments</option>
      </select>
    </div>
  );
}

export default SortByBox;