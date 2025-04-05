import React from "react";

function ThemeToggle({ setDarkMode }) {
  console.log(setDarkMode, "<--- this is setdarkmode");
  return (
    <button
      className="theme-toggle-button"
      onClick={() => setDarkMode((prevMode) => !prevMode)} 
      title="Toggle theme"
    >
      {setDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;