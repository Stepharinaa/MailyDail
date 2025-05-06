import { Link } from "react-router-dom";
import articlePlaceHolderImage from "../assets/article-placeholder-image.webp";
import timeAgo from "../utils/formatTimeToNow";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <img
        src={article.article_img_url || articlePlaceHolderImage}
        alt={article.title}
        className="article-img"
      />
      <div className="article-content">
        <h2 className="article-title">
          <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
        </h2>
        <p className="article-meta">Topic: {article.topic}</p>
        <p className="article-meta">Created: {timeAgo(article.created_at)}</p>
        <span className="article-author">Written by: {article.author}</span>
        <div className="votes-and-comments-row">
          <span className="votes-value">
            <Link to={`/articles/${article.article_id}`}>
              👍 {article.votes}
            </Link>
          </span>
          <div className="comments-container">
            <span className="comments-value">
              <Link to={`/articles/${article.article_id}`}>
                💭 {article.comment_count}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
