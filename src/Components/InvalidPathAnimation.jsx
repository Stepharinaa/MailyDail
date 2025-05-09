import React, { Suspense, lazy } from "react";
import PageNotFoundAnimation from "../assets/page-not-found-animation.json";

const Lottie = lazy(() => import("lottie-react"));

function InvalidPathAnimation() {
  return (
    <div>
      <Suspense fallback={<div>Loading animation...</div>}>
      <Lottie
        animationData={PageNotFoundAnimation}
        loop={true}
        autoplay={true}
      />
      </Suspense>
    </div>
  );
}

export default InvalidPathAnimation;
