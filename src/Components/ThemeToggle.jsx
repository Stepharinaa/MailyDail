import React from "react";

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="theme-toggle-button"
      onClick={() => setDarkMode((prevMode) => !prevMode)} 
      title="Toggle theme"
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

export default ThemeToggle;