import ArticleCard from "./ArticleCard"

function ArticleList({articles}) {
    return (
        <section>
            {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
            ))}
        </section>
    )
}

export default ArticleList