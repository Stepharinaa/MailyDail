import { useState, useEffect } from 'react'
import ArticleList from '../Components/ArticleList'
import AllArticlesBar from '../Components/AllArticlesBar'
import { fetchArticles } from '../utils/api'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState("created_at");
    const [topic, setTopic] = useState("");

    useEffect(() => {
        setIsLoading(true)
        fetchArticles(sortBy, topic)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            setIsLoading(false)
        })
    }, [sortBy, topic])


return (
    <main>
        <h1>All Articles</h1>
        <AllArticlesBar setSortBy={setSortBy} setTopic={setTopic} />
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default AllArticlesPage