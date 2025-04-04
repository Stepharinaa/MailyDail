import { Link } from "react-router-dom";
import articlePlaceHolderImage from "../assets/article-placeholder-image.png"
import timeAgo from "../utils/formatTimeToNow";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <img src={article.article_img_url || articlePlaceHolderImage} alt={article.title} className="article-img" />
      <div className="article-content">
        <h2 className="article-title">
          <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
        </h2>
        <p className="article-meta">Created: {timeAgo(article.created_at)}</p>
          <p className="article-meta">Topic: {article.topic}</p>
        <span className="article-author">Written by: {article.author}</span>
          <div className="comments-box">
          <span className="comments-value">🗪 {article.comment_count} Comments</span>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;