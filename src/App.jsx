import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import SingleArticlePage from "./Pages/SingleArticlePage";
import AllTopicsPage from "./Pages/AllTopicsPage";
import ArticlesByTopicPage from "./Pages/ArticlesByTopicPage";

import "./App.css"

import AllArticlesPage from "./Pages/AllArticlesPage"

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
          <Route path="/articles/:article_id" element={<SingleArticlePage />} />
          <Route path="/topics" element={<AllTopicsPage />} />
          <Route path="/topics/:slug" element={<ArticlesByTopicPage />} />
          <Route path="*" element={<InvalidPathPage />} />
        </Routes>
      </div>
  )
}

export default App
