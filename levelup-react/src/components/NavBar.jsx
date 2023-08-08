import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toggle from "./Toggle";
import searchIcon from "../assets/svg/lupa.svg";
import "../styles/NavBar.css";
import { Menu } from "./Menu";
import menuIcon from "../assets/svg/menu.svg";

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
    // console.log("Search query:", searchQuery);
    // console.log("Search option:", searchOption);
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
      <section className="list-navbar-search">
        <form className="search-form" onSubmit={handleSearchSubmit}>
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
      </section>
      <section className="menu-navbar" onClick={handleMenuClick}>
        <img className="menu-icon" src={menuIcon} alt="Menu" />
        {/* Pasar el estado de apertura del menú como prop */}
        <Menu isMenuOpen={isMenuOpen} />
      </section>

      {/* Colocar el componente Toggle fuera de los elementos <ul> y <li> */}
      <Toggle />
    </nav>
  );
}