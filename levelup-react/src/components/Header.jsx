import { Link } from "react-router-dom";
import Logo from "../assets/svg/titulo.svg";

export function Header() {
  return (
    <header>
      <Link className="main-title" to="/">
        <h1>
          <img src={Logo} alt="Level Up!" className="img-logo" />
        </h1>
      </Link>´
      <Link to="/new-post">Al formulario/</Link>
    </header>
  );
}
