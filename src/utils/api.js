import axios from "axios";

const api = axios.create({
  baseURL: "https://stephs-northcoders-news.onrender.com/api",
});

const fetchArticles = (sortBy = "created_at", topic = "") => {
  let url = `/articles?sort_by=${sortBy}&order=DESC`;
  if (topic) {
    url += `&topic=${topic}`;
  }

  return api
    .get("/articles")
    .then(({ data }) => data.articles)
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

const fetchTop5Articles = () => {
  return api
    .get("/articles?sort_by=votes&order=DESC&limit=5&page=1")
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

export { fetchArticles, fetchSingleArticle, fetchTop5Articles, fetchTopics };
