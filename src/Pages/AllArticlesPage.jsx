import { useState, useEffect } from 'react'
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import SortByBox from '../Components/SortByBox'
import FilterByTopicBar from '../Components/AllArticlesBar'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState("DESC")
    const [topic, setTopic] = useState("");

    useEffect(() => {
        setIsLoading(true)
        fetchArticles(sortBy, order, topic)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            setIsLoading(false)
        })
    }, [sortBy, order, topic])


return (
    <main>
        <h1>All Articles</h1>
        <FilterByTopicBar setTopic={setTopic} />
        <SortByBox onSortChange={setSortBy} onOrderChange={setOrder}/>
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default AllArticlesPage