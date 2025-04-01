import React from "react";
import {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {fetchSingleArticle} from "../utils/api"
import Header from "../Components/Header";

function SingleArticlePage() {
    const {article_id} = useParams()
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSingleArticle(article_id)
          .then((data) => {
            setArticle(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching article:", error);
            setIsLoading(false);
          });
      }, [article_id]);

      if (isLoading) return <p>Loading article...</p>;
      if (!article) return <p>Article not found!</p>;

      return (
        <article className="single-article">
          <h1>{article.title}</h1>
          <span>Posted: {new Date(article.created_at).toLocaleDateString()}</span>
          <p>Written by: {article.author}</p>
          <img src={article.article_img_url} alt={article.title} className="article-img" />
          <p>{article.body}</p>
          <p>Votes: {article.votes} | Comments: {article.comment_count}</p>
        </article>
      );
    }

    export default SingleArticlePage