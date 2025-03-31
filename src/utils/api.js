import axios from "axios";

const api = axios.create({
  baseURL: "https://stephs-northcoders-news.onrender.com/api",
});

const getArticles = () => {
  return api
    .get("/articles")
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
};

export { getArticles };
