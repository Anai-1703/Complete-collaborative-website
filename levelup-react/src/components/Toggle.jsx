import React from "react";
import useThemeToggle from "../hooks/UseThemeToggle.jsx";
import toggleLight from "../assets/svg/toggleLight.png";
import toggleDark from "../assets/svg/toggleDark.png";
import "./Toggle.css";

const Toggle = () => {
  const { isDarkMode, ToggleTheme } = useThemeToggle(); // Asegúrate de que la función se llame "ToggleTheme"

  const handleThemeChange = () => {
    document.body.classList.toggle("dark-mode", !isDarkMode);
    ToggleTheme(); // Aquí debes usar "ToggleTheme" para cambiar el tema
  };

  return (
    <button className="toggle-button" onClick={handleThemeChange}>
      <img src={isDarkMode ? toggleLight : toggleDark} alt="Toggle" />
    </button>
  );
};

export default Toggle;
