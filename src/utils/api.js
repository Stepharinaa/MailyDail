import axios from "axios";

const api = axios.create({
  baseURL: "https://stephs-northcoders-news.onrender.com/api",
});

const fetchArticles = () => {
  return api
    .get("/articles")
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
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

export { fetchArticles, fetchTop5Articles };
