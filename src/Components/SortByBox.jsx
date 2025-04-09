import { useState, useEffect } from "react";

function SortByBox({ sortBy, order, onSortAndOrderChange }) {
  const [selectedOption, setSelectedOption] = useState(`${sortBy}-${order}`);

  const options = [
    { label: "Newest", value: "created_at-DESC" },
    { label: "Oldest", value: "created_at-ASC" },
    { label: "Most Liked", value: "votes-DESC" },
    { label: "Least Liked", value: "votes-ASC" },
    { label: "Most Commented", value: "comment_count-DESC" },
    { label: "Least Commented", value: "comment_count-ASC" },
  ];

  useEffect(() => {
    setSelectedOption(`${sortBy}-${order}`);
  }, [sortBy, order]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") return;
    const [newSortBy, newOrder] = event.target.value.split("-");
    setSelectedOption(event.target.value);
    onSortAndOrderChange(newSortBy, newOrder);
  };

  return (
    <div className="sort-by-bar">
      <label htmlFor="sort-by" className="sr-only">
        Sort by:
      </label>
      <select
        id="sort-order-select"
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByBox;
