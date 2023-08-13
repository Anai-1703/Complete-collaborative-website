import useThemeToggle from "../hooks/UseThemeToggle.jsx";
import toggleLight from "../assets/svg/toggleLight.png";
import toggleDark from "../assets/svg/toggleDark.png";
import "../styles/Toggle.css"

const Toggle = () => {
  const { isDarkMode, ToggleTheme } = useThemeToggle();

  const handleThemeChange = () => {
    document.body.classList.toggle("darkMode", !isDarkMode);
    ToggleTheme();
  };

  return (
    <button className="toggle-button" onClick={handleThemeChange}>
      <img src={isDarkMode ? toggleLight : toggleDark} alt="Toggle" />
    </button>
  );
};

export default Toggle;
