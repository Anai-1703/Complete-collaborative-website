
import { useState } from "react";
import Toggle from "./Toggle";
import "../styles/NavBar.css";
import { Menu } from "./Menu";
import menuIcon from "../assets/svg/menu.svg";
import { SearchBar } from "./SearchBar";

export function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <SearchBar />
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