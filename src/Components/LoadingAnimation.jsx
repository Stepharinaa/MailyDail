import Lottie from "lottie-react"
import loadingAnimation from "../assets/loading-animation.json";

function LoadingAnimation() {
  return (
    <div className="loading-container">
      <Lottie animationData={loadingAnimation} loop={true} autoplay={true}/>
    </div>
  );
}

export default LoadingAnimation;