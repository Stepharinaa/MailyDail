import logo from "../assets/placeholder-logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
           <div className="logo-title">
      <Link to="/"><img className="logo" src={logo} alt="NC News Logo"/></Link>
      <h1 className="site-title">Maily Dail</h1>
      </div>
    </header>
  );
}

export default Header;