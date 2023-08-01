import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toggle from "./Toggle";
import searchIcon from "../assets/svg/lupa.svg";

import "../styles/NavBar.css";
import { Menu } from "./Menu";

export function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("users");


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


  return (
    <nav>
      <ul>
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
                    <button className="search-button" type="submit">
                    <img className="search-button" src={searchIcon} alt="Search" />
                    </button>
                </form>
            </li>
      </ul>
      <Menu />
      {/* Colocar el componente Toggle fuera de los elementos <ul> y <li> */}
      <Toggle />
    </nav>
  );
}