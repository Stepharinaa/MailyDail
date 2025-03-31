import logo from "../assets/placeholder-logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/"><img className="logo" src={logo} /></Link>
      <h1>NC News</h1>
    </header>
  );
}

export default Header;