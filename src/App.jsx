import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import "./App.css"

// import AllArticlesPage from "./Pages/AllArticlesPage"

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/articles" element={<AllArticlesPage />} /> */}
        </Routes>
      </div>
  )
}

export default App
