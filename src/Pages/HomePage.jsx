import { useState, useEffect } from "react";
import ArticleList from "../Components/ArticleList";
import { fetchTop8Articles } from "../utils/api";
import WelcomeMessage from "../Components/WelcomeMessage";
import LoadingAnimation from "../Components/LoadingAnimation";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchTop8Articles()
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
  }, []);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <main role="main" aria-labelledby="main-heading">
      <WelcomeMessage />

      {isLoading && (
        <div aria-live="polite" aria-busy="true">
          <LoadingAnimation />
          <span className="sr-only">Loading popular articles...</span>
        </div>
      )}

      {error && (
        <p className="error-message" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <section className="articles-section" aria-labelledby="popular-articles-heading">
          <h1 id="popular-articles-heading" className="header-title">
            Our Most Popular Articles 👀
          </h1>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <ArticleList articles={articles} />
          )}
        </section>
      )}
    </main>
  );
}

export default HomePage;
