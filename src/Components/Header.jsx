import logo from "../assets/mailydail.png";
import { Link } from "react-router-dom";

function Header() {
  function handleClick() {
    console.log("clicked");
  }
  return (
    <header className="header">
           <div className="logo-title">
      <Link to="/"><img className="logo" src={logo} alt="NC News Logo"/></Link>
      </div>
      <nav className="navigation-links">
      <Link to="/articles" onClick={handleClick}>
        Articles
      </Link>
      <Link to="/topics" onClick={handleClick}>
        Topics
      </Link>
      <Link to="/profile" onClick={handleClick}>
        Profile
      </Link>
      </nav>
    </header>
  );
}

export default Header;