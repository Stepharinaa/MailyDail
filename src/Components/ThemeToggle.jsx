import React from "react";

function ThemeToggle({ setDarkMode }) {
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