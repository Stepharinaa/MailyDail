import { useState, useEffect } from 'react'
import ArticleList from '../Components/ArticleList'
import { fetchTop5Articles } from '../utils/api'
import WelcomeMessage from '../Components/WelcomeMessage'

function HomePage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        fetchTop5Articles()
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            if (error.response && error.response.status === 404) {
              setError("Oops! The article(s) you're looking for doesn't exist.")
            } else {
            setError("Error fetching article. Please try again!")
            }
            setIsLoading(false);
        })
    }, [])

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p className="error-message">{error}</p>;

return (
    <main>
        <WelcomeMessage/>
        <h1 className="header">Check out our most popular articles 👀</h1>
        {articles.length === 0 ? <p>No articles found.</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default HomePage