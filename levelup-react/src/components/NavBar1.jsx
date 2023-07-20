import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../assets/svg/lupa.svg";
import "./navBar.css";

export function NavBar() {
  const history = useHistory(); // Hook para acceder a la instancia de la historia de enrutamiento
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("users"); // Opción de búsqueda por defecto: usuarios

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Lógica para realizar la búsqueda
    console.log("Search query:", searchQuery);
    console.log("Search option:", searchOption);

    // Redirigir al usuario a la página de usuarios después de realizar la búsqueda
    if (searchOption === "users") {
      history.push("/users");
    } else if (searchOption === "posts") {
      // Aquí puedes redirigir a la página de publicaciones si tienes una ruta configurada para ella
      // history.push("/posts");
    }

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
