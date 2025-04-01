import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <h2>
        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
      </h2>
      <p>By {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </article>
  );
}

export default ArticleCard;