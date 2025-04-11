import Lottie from "lottie-react";
import PageNotFoundAnimation from "../assets/page-not-found-animation.json";

function InvalidPathAnimation() {
  return (
    <div>
      <Lottie
        animationData={PageNotFoundAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default InvalidPathAnimation;
