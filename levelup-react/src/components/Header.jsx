import { Link } from "react-router-dom";
import Logo from "../assets/svg/titulo.svg";
import "./Header.css";

export function Header() {
  return (
    <header>
      <Link className="main-title" to="/">
        <h1>
          <img src={Logo} alt="Level Up!" className="img-logo" />
        </h1>
      </Link>
    </header>
  );
}
