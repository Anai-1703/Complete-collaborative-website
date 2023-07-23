import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../assets/svg/lupa.svg";
import menuIcon from "../assets/svg/menu.svg";
import "./navBar.css";

export function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("users");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    console.log("Search option:", searchOption);

    if (searchOption === "users") {
      navigate("/users");
    } else if (searchOption === "posts") {
      // Aquí puedes redirigir a la página de publicaciones si tienes una ruta configurada para ella
      // navigate("/posts");
    }

    setSearchQuery("");
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <ul>
        <li className="menu-icon" onClick={handleMenuClick}>
          <img src={menuIcon} alt="Menu" />
          {isMenuOpen && (
            <ul className="menu-dropdown">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Registro</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select value={searchOption} onChange={handleSearchOptionChange}>
              <option value="users">Usuarios</option>
              <option value="posts">Publicaciones</option>
            </select>
            <button type="submit">
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
