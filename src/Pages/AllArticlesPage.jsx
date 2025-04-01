import { useState, useEffect } from 'react'
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import WelcomeMessage from '../Components/WelcomeMessage'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticles()
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            setIsLoading(false)
        })
    }, [])


return (
    <main>
        <h1>All Articles</h1>
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default AllArticlesPage