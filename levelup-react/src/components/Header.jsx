import { Link } from "react-router-dom";
import Logo from "../assets/svg/titulo.svg";
import "../styles/Header.css";

export function Header() {
  return (
    <header>
      <Link className="main-title" to="/">
          <img src={Logo} alt="Level Up!" className="img-logo" />
        <h1 className="h1-hidden">
          Level Up!
        </h1>
      </Link>
    </header>
  );
}
