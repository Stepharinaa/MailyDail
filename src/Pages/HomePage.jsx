import { useState, useEffect } from 'react'
import ArticleList from '../Components/ArticleList'
import { fetchTop5Articles } from '../utils/api'
import WelcomeMessage from '../Components/WelcomeMessage'

function HomePage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchTop5Articles()
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
        <WelcomeMessage/>
        <h1 className="header">Check out our most popular articles 👀</h1>
        {isLoading ? <p>Loading articles...</p> : <ArticleList articles={articles} />}
    </main>
);
}

export default HomePage