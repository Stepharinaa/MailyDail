import { useState } from 'react';

function SortByBox({ onSortChange, onOrderChange }) {
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC")

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    onOrderChange(selectedOrder);
  };

  return (
    <div className="sort-by-bar">
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>

      <label htmlFor="order-by">Order by:</label>
      <select id="order-by" value={order} onChange={handleOrderChange}>
      <option value="DESC">Descending</option>
      <option value="ASC">Ascending</option>
      </select>
    </div>
  )
}

export default SortByBox;