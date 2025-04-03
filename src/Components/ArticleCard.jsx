import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <img src={article.article_img_url} alt={article.title} className="article-img" />
      <div className="article-content">
        <h2 className="article-title">
          <Link to={`/articles/${article.article_id}`}>{article.title}</Link>

        </h2>
          <p className="article-meta">Topic: {article.topic}</p>
        <span className="article-author">Written by: {article.author}</span>
        {/* <div className="article-stats"> */}
          <div className="comments-box">
          <span className="comments-value">🗪 {article.comment_count} Comments</span>
        </div>
      {/* </div> */}
      </div>
    </article>
  );
}

export default ArticleCard;