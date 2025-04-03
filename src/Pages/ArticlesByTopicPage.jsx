import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { fetchArticlesByTopic } from "../utils/api"
import ArticleCard from "../Components/ArticleCard"
import SortByBox from "../Components/SortByBox"


function ArticlesByTopic() {
    const {slug} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get("sort_by") || "created_at"
    const order = searchParams.get("order") || "DESC"

    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopic(sortBy, order, slug)
 .then((data) => {
        setArticles(data)
        setIsLoading(false)
    })
    .catch((error) => {
        console.error("Error loading articles:", error)
        setError("Failed to load articles. Please try again!")
        setIsLoading(false)
    })
}, [sortBy, order, slug])

const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, order });
};

const handleOrderChange = (newOrder) => {
    setSearchParams({ sort_by: sortBy, order: newOrder });
}

return (
    <section className="topic-articles-container">
      <h1>Articles about {slug}</h1>
      {error && <p className="error-message">{error}</p>}
      <SortByBox onSortChange={handleSortChange} onOrderChange={handleOrderChange}/>
      {isLoading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="articles-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} /> 
            ))
          ) : (
            <p>No articles found for this topic.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ArticlesByTopic;