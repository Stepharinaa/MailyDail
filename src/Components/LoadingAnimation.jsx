import React, { Suspense, lazy } from "react";
import loadingAnimation from "../assets/loading-animation.json";

const Lottie = lazy(() => import("lottie-react"));

function LoadingAnimation() {
  return (
    <div className="loading-container">
      <Suspense fallback={<div>Loading animation...</div>}>
        <Lottie animationData={loadingAnimation} loop autoplay />
      </Suspense>
    </div>
  );
}

export default LoadingAnimation;
