
import { useState } from "react";
import Toggle from "./Toggle";
import "../styles/NavBar.css";
import { Menu } from "./Menu";
import menuIcon from "../assets/svg/menu.svg";
import { SearchBar } from "./SearchBar";
import "../styles/NavBar.css";
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
        <Menu isMenuOpen={isMenuOpen} />
      </section>
      <Toggle />
    </nav>
  );
}