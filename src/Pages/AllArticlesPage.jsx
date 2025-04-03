import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import SortByBox from '../Components/SortByBox'
import FilterByTopicBar from '../Components/FilterByTopicBar'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get("sort_by") || "created_at"
    const order = searchParams.get("order") || "DESC"
    const topic = searchParams.get("topic") || ""

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

    const handleTopicChange = (newTopic) => {
        setSearchParams({ sort_by: sortBy, order: order, topic: newTopic });
    };

return (
    <main>
        <h1>All Articles</h1>
        <FilterByTopicBar setTopic={handleTopicChange} />
        <SortByBox onSortChange={handleSortChange} onOrderChange={handleOrderChange}/>
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default AllArticlesPage