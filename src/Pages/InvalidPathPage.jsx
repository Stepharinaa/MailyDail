import { Suspense, lazy } from "react";

const InvalidPathAnimation = lazy(() =>
  import("../Components/InvalidPathAnimation")
);

function InvalidPathPage() {
  return (
    <div id="invalid-path-animation">
      <h1>404 - Page Not Found!</h1>

      <Suspense fallback={<p>Loading animation...</p>}>
        <InvalidPathAnimation />
      </Suspense>

      <p>We couldn't find the page you were looking for.</p>
    </div>
  );
}

export default InvalidPathPage;
