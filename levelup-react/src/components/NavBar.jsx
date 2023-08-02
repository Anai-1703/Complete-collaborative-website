import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toggle from "./Toggle";
import searchIcon from "../assets/svg/lupa.svg";
import menuIcon from "../assets/svg/menu.svg";
import { getToken } from "../services/token/getToken";
import { getUserToken } from "../services/token/getUserToken";
import { getTokenInfo } from "../services/token/getTokenInfo";
import { deleteToken } from "../services/token/deleteToken";
import "./navBar.css";

export function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("users");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    const userToken = getUserToken();

    if (token && userToken) {
      const tokenInfo = getTokenInfo(token);
      if (tokenInfo) {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Evita que el evento se propague al elemento li
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    deleteToken();
    setIsLoggedIn(false);
    navigate("/"); // Redirige a la página de login después de hacer logout
  };

  return (
    <nav>
      <ul>
        <li className="menu-icon" onClick={handleMenuClick}>
          <img src={menuIcon} alt="Menu" />
          {isMenuOpen && (
            <ul className="menu-dropdown">
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Registro</Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
              <li>
                <Link to="/new-post">New Post</Link>
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
      {/* Colocar el componente Toggle fuera de los elementos <ul> y <li> */}
      <Toggle />
    </nav>
  );
}
