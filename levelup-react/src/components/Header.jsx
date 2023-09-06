import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeToggle from "../hooks/UseThemeToggle";
import logo from "../assets/svg/titulo.svg";
import logo2 from "../assets/svg/Titulo2.svg";
import "../styles/index.css";

export function Header() {
  const { isDarkMode } = useThemeToggle();
  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    setCurrentLogo(isDarkMode ? logo2 : logo);
  }, [isDarkMode]);
  
  return (
    <header>
      <Link className="main-title" to="/">
        <h1 className="logo-container">
          <img src={currentLogo} alt="Level Up!" className="img-logo" />
        </h1>
      </Link>
    </header>
  );
}
