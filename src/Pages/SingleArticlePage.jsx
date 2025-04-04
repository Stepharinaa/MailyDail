import React from "react";
import {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {fetchSingleArticle} from "../utils/api"
import CommentSection from "../Components/CommentSection";
import ArticleVotesButton from "../Components/ArticleVotesButton";

function SingleArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
      setIsLoading(true)
      setError(null)
        fetchSingleArticle(article_id)
          .then((data) => {
            setArticle(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching article:", error);
            if (error.response && error.response.status === 404) {
              setError("Oops! The article you're looking for doesn't exist.")
            } else {
            setError("Error fetching article. Please try again!")
            }
            setIsLoading(false);
          });
      }, [article_id]);

      if (isLoading) return <p>Loading article...</p>;
      if (error) return <p className="error-message">{error}</p>;

      return (
        <article className="single-article">
          <h1 className="article-header">{article.title}</h1>
          <p>Written by: {article.author}</p>
          <img className="article-img" src={article.article_img_url} alt={article.title}/>
          <p>Posted: {new Date(article.created_at).toLocaleDateString()}</p>
          <p className="article-body">{article.body}</p>
          <ArticleVotesButton articleID={article_id} currentVotes={article.votes}/>

        <div className="article-stats">
          <div className="comments-box">
          <span className="comments-value">🗪 {article.comment_count} Comments</span>
        </div>
      </div>
      <CommentSection articleId={article_id}/>
        </article>
      );
    }

    export default SingleArticlePage