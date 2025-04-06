import axios from "axios";

const api = axios.create({
  baseURL: "https://stephs-northcoders-news.onrender.com/api",
});

const fetchArticles = (
  limit = 0,
  page = 1,
  sortBy = "created_at",
  order = "DESC",
  topic = ""
) => {
  let url = `/articles?limit=${limit}&page=${page}`;

  if (sortBy) {
    url += `&sort_by=${sortBy}&order=${order}`;
  }

  if (topic) {
    url += `&topic=${topic}`;
  }

  return api
    .get(url)
    .then(({ data }) => {
      return {
        articles: data.articles,
        total_count: data.total_count,
      };
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

const fetchSingleArticle = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article)
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

const updateVotesOnArticle = (article_id, voteChange) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: voteChange })
    .then(({ data }) => data.article)
    .catch((error) => {
      console.error("Error updating votes:", error);
      throw error;
    });
};

const fetchCommentsByArticleID = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data.comments)
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};

const postCommentByArticleID = (article_id, newComment) => {
  return api
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => data.comment)
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

const updateVotesByCommentID = (comment_id, voteChange) => {
  return api
    .patch(`/articles/${comment_id}`, { inc_votes: voteChange })
    .then(({ data }) => data.comment)
    .catch((error) => {
      console.error("Error updating votes on comment:", error);
      throw error;
    });
};

const deleteCommentByCommentID = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).catch((error) => {
    console.error("Error removing comment:", error);
    throw error;
  });
};

const fetchTop8Articles = () => {
  return api
    .get("/articles?sort_by=votes&order=DESC&limit=8&page=1")
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

const fetchTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => data.topics)
    .catch((error) => {
      console.error("Error fetching topics:", error);
      throw error;
    });
};

const createTopic = (slug, description) => {
  return api
    .post("/topics", { slug, description })
    .then(({ data }) => data.topic)
    .catch((error) => {
      console.error("Error posting topic:", error);
      throw error;
    });
};

const fetchArticlesByTopic = (
  sortBy = "created_at",
  order = "DESC",
  topic = ""
) => {
  let url = `/articles?sort_by=${sortBy}&order=${order}`;
  if (topic) {
    url += `&topic=${topic}`;
  }
  return api
    .get(url)
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles by topic:", error);
      throw error;
    });
};

export {
  fetchArticles,
  fetchSingleArticle,
  updateVotesOnArticle,
  fetchCommentsByArticleID,
  postCommentByArticleID,
  updateVotesByCommentID,
  deleteCommentByCommentID,
  fetchTop8Articles,
  fetchTopics,
  createTopic,
  fetchArticlesByTopic,
};
