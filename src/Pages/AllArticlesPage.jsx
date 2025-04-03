import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import SortByBox from '../Components/SortByBox'
import FilterByTopicBar from '../Components/AllArticlesBar'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topic, setTopic] = useState("");
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get("sort_by") || "created_at"
    const order = searchParams.get("order") || "DESC"

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

    const handleSortChange = (newSortBy) => {
        setSearchParams({ sort_by: newSortBy, order });
    };
    
    const handleOrderChange = (newOrder) => {
        setSearchParams({ sort_by: sortBy, order: newOrder });
    }

return (
    <main>
        <h1>All Articles</h1>
        <FilterByTopicBar setTopic={setTopic} />
        <SortByBox onSortChange={handleSortChange} onOrderChange={handleOrderChange}/>
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default AllArticlesPage