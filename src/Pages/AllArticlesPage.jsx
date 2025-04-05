import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import SortByBox from '../Components/SortByBox'
import FilterByTopicBar from '../Components/FilterByTopicBar'
import LoadingAnimation from '../Components/LoadingAnimation'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(null)

    const sortBy = searchParams.get("sort_by") || "created_at"
    const order = searchParams.get("order") || "DESC"
    const topic = searchParams.get("topic") || ""
    const limit = parseInt(searchParams.get("limit")) || 10
    const currentPage = parseInt(searchParams.get("page")) || 1

    const [totalPages, setTotalPages] = useState(10)

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        fetchArticles(limit, currentPage, sortBy, order, topic)
        .then(({articles, total_count}) => {
            setArticles(articles)
            setTotalPages(Math.ceil(total_count/limit) || 1)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            if (error.response && error.response.status === 404) {
              setError("Oops! The article(s) you're looking for doesn't exist.")
            } else {
            setError("Error fetching articles. Please try again!")
            }
            setIsLoading(false);
        })
    }, [limit, currentPage, sortBy, order, topic])

    const handleSortChange = (newSortBy) => {
        setSearchParams({ sort_by: newSortBy, order });
    };
    
    const handleOrderChange = (newOrder) => {
        setSearchParams({ sort_by: sortBy, order: newOrder });
    }

    const handleTopicChange = (newTopic) => {
        setSearchParams({ sort_by: sortBy, order: order, topic: newTopic });
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
        setSearchParams({ sort_by: sortBy, order, topic, page, limit })
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    if (isLoading) return <LoadingAnimation />;
    if (error) return <p className="error-message">{error}</p>;

return (
    <main>
        <h1 className="header">All Articles</h1>
        <SortByBox onSortChange={handleSortChange} onOrderChange={handleOrderChange}/>
        <FilterByTopicBar setTopic={handleTopicChange} />
        {articles.length === 0 ? (<p>No articles found.</p>
        ) : (
        <ArticleList articles={articles} />
        )}
        <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
            </button>
            </div>
    </main>
);
}

export default AllArticlesPage