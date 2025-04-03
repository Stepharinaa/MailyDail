import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { fetchArticlesByTopic } from "../utils/api"
import ArticleCard from "../Components/ArticleCard"
import SortByBox from "../Components/SortByBox"


function ArticlesByTopic() {
    const {slug} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState("DESC")
    const [error, setError] = useState(null)

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

return (
    <section className="topic-articles-container">
      <h1>Articles about {slug}</h1>
      {error && <p className="error-message">{error}</p>}
      <SortByBox onSortChange={setSortBy} onOrderChange={setOrder}/>
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