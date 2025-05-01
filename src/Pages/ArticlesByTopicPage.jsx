import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "../Components/ArticleCard";

import LoadingAnimation from "../Components/LoadingAnimation";

const SortByBox = React.lazy(() => import("../Components/SortByBox"));

function ArticlesByTopic() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "DESC";

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchArticlesByTopic(sortBy, order, slug)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        if (error.response && error.response.status === 404) {
          setError("Oops! The article(s) you're looking for doesn't exist.");
        } else {
          setError("Error fetching article. Please try again!");
        }
        setIsLoading(false);
      });
  }, [sortBy, order, slug]);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p className="error-message">{error}</p>;

  const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, order });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  return (
    <section
      className="topic-articles-container"
      aria-labelledby="topic-articles-heading"
    >
      <h1 className="header-title">Articles about {slug}</h1>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <Suspense fallback={<p role="status">Loading sort options...</p>}>
        <SortByBox
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
        />
      </Suspense>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <section className="articles-list" role="list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))
          ) : (
            <p>No articles found for this topic.</p>
          )}
        </section>
      )}
    </section>
  );
}

export default ArticlesByTopic;
