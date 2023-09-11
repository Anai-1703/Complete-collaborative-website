import { useState, useEffect } from "react";
import logo2 from "../assets/svg/Titulo2.svg";
import Logo from "../assets/svg/titulo.svg";

const UseThemeToggle = () => {
  const storedMode = localStorage.getItem("lu_mode");
  const [isDarkMode, setIsDarkMode] = useState(storedMode === "dark");
  const [logo, setLogo] = useState(Logo);

  const ToggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundImage =
        "linear-gradient(to bottom, #ed5c0e, #5f2607)";
      setLogo(logo2);
    } else {
      document.body.style.backgroundImage = "";
      document.body.style.color = "";
      setLogo(Logo);
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("lu_mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return { isDarkMode, ToggleTheme, logo };
};

export default UseThemeToggle;