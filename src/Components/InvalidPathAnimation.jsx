import Lottie from "lottie-react"
import PageNotFoundAnimation from "../assets/page-not-found-animation.json";

function InvalidPathAnimation() {
  return (
    <div id="invalid-path-loading-container">
      <Lottie animationData={PageNotFoundAnimation} loop={true} autoplay={true}/>
    </div>
  );
}

export default InvalidPathAnimation;