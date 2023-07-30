import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeToggle from "../hooks/UseThemeToggle";
import logo from "../assets/svg/titulo.svg";
import logo2 from "../assets/svg/titulo2.svg";

export function Header() {
  const { isDarkMode } = useThemeToggle();
  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    setCurrentLogo(isDarkMode ? logo2 : logo);
    console.log("Logo cambiado:", currentLogo);
  }, [isDarkMode, currentLogo]);
  return (
    <header>
      <Link className="main-title" to="/">
        <h1>
          <img src={currentLogo} alt="Level Up!" className="img-logo" />
        </h1>
      </Link>
    </header>
  );
}
