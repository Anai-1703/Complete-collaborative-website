import { Link } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../assets/svg/lupa.svg"; // Importa la imagen SVG
import "./navBar.css";

export function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Lógica para realizar la búsqueda
    console.log("Search query:", searchQuery);
    setSearchQuery("");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Registro</Link>
        </li>
        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <img className="search-button" src={searchIcon} alt="Search" />{" "}
              {/* Agrega la imagen SVG al botón */}
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
