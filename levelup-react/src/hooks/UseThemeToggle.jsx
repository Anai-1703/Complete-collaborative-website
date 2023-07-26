import { useState } from "react";

const UseThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const ToggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, ToggleTheme };
};

export default UseThemeToggle;
