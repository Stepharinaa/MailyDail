import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { fetchArticlesByTopic } from "../utils/api"
import {Link} from "react-router-dom"
import ArticlePlaceHolderImage from "../assets/article-placeholder-image.png"
import ArticleVotesButton from "../Components/ArticleVotesButton"

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
        <div>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.article_id} className="article-card">
                <h2 className="article-title">{article.title}</h2>
                
                <img
                src={article.article_img_url || ArticlePlaceHolderImage}
                alt={article.slug}
                className="article-img"
                />
                <Link to={`/articles/${article.article_id}`} className="read-more-link">Read more</Link>
              </div>
            ))
          ) : (
            <p>No articles found for this topic.</p>
          )}
        </div>
      )}
    </section>
  );

}

export default ArticlesByTopic