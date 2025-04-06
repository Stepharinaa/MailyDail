import InvalidPathAnimation from "../Components/InvalidPathAnimation"

function InvalidPathPage() {
    return (
        <div id="invalid-path-animation">
            <h1>404 - Page Not Found!</h1>
            <InvalidPathAnimation />
            <p>The page you are looking for doesn't exist...</p>
        </div>
    )
}

export default InvalidPathPage