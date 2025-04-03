import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { fetchArticlesByTopic } from "../utils/api"
import ArticleCard from "../Components/ArticleCard"


function ArticlesByTopic() {
    const {slug} = useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetchArticlesByTopic(slug)
 .then((data) => {
        setArticles(data)
        setIsLoading(false)
    })
    .catch((error) => {
        console.error("Error loading articles:", error)
        setError("Failed to load articles. Please try again!")
        setIsLoading(false)
    })
}, [slug])

return (
    <section className="topic-articles-container">
      <h1>Articles about {slug}</h1>
      {error && <p className="error-message">{error}</p>}
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