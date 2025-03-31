import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
        </Routes>
      </div>
  )
}

export default App
