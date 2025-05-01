import React, { Suspense } from "react";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleList from "../Components/ArticleList";
import { fetchArticles } from "../utils/api";

const SortByBox = React.lazy(() => import("../Components/SortByBox"));
const FilterByTopicBar = React.lazy(() =>
  import("../Components/FilterByTopicBar")
);

import LoadingAnimation from "../Components/LoadingAnimation";
import { useNavigate } from "react-router-dom";

function AllArticlesPage() {
  let navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "DESC";
  const topic = searchParams.get("topic") || "";
  const limit = parseInt(searchParams.get("limit")) || 8;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [totalPages, setTotalPages] = useState(8);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchArticles(limit, currentPage, sortBy, order, topic)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotalPages(Math.ceil(total_count / limit) || 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        if (error.response && error.response.status === 404) {
          setError("Oops! The article(s) you're looking for doesn't exist.");
        } else {
          setError("Error fetching articles. Please try again!");
        }
        setIsLoading(false);
      });
  }, [limit, currentPage, sortBy, order, topic]);

  const handleSortAndOrderChange = (newSortBy, newOrder) => {
    setSearchParams({ sort_by: newSortBy, order: newOrder, topic });
  };

  const handleTopicChange = (newTopic) => {
    setSearchParams({ sort_by: sortBy, order: order, topic: newTopic });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ sort_by: sortBy, order, topic, page, limit });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (isLoading) return <LoadingAnimation />;
  if (error)
    return (
      <p role="alert" className="error-message">
        {error}
      </p>
    );

  return (
    <main role="main" aria-labelledby="all-articles-heading">
      <div className="all-articles-section">
        <header className="header-row">
          <h1 id="all-articles-heading">All Articles</h1>
          <button
            id="post-button"
            onClick={() => navigate("/articles/create")}
            aria-label="Post a new article"
          >
            ➕ Post a New Article
          </button>
        </header>

        <nav
          className="filters-container"
          role="navigation"
          aria-label="Filter and sort articles"
        >
          <Suspense fallback={<p>Loading sort options...</p>}>
            <FilterByTopicBar topic={topic} setTopic={handleTopicChange} />
          </Suspense>

          <Suspense fallback={<p>Loading sort options...</p>}>
            <SortByBox
              sortBy={sortBy}
              order={order}
              onSortAndOrderChange={handleSortAndOrderChange}
            />
          </Suspense>
        </nav>

        <section
          className="articles-section"
          aria-live="polite"
          aria-label="Article results/display"
          role="list"
        >
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <ArticleList articles={articles} />
          )}
        </section>
      </div>

      <nav
        className="pagination-controls"
        role="navigation"
        aira-label="Pagination navigation"
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    </main>
  );
}

export default AllArticlesPage;
