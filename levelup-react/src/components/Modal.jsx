import { useEffect, useState } from "react";
import "../styles/Modal.css";

const Modal = ({ type, visible, onClose, autoCloseTimeout  }) => {
  const [showDefault, setShowDefault] = useState(true);

  useEffect(() => {
    if (visible) {
      const title = document.querySelector(".Modal-Title");
      title.style.animation = "none";
      title.offsetHeight;
      title.style.animation = "colorChange 2s infinite alternate";

      if (autoCloseTimeout) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseTimeout);

        return () => clearTimeout(timer);
      }
    }
  }, [autoCloseTimeout, onClose, visible]);

  const closeModal = () => {
    onClose();
  };

  const renderContent = () => {
    switch (type) {
      case "login":
        return (
        <>
            <p>Credenciales inválidas, vuelve a introducir el usuario y contraseña</p>
            <button onClick={closeModal}>Close</button>
        </>
        );
      case "newpost":
        return (
        <>
          <p></p>
          <ul>
            <li>¡Debes añadir todos los campos!</li>
            <li>La foto es opcional. ¡Puedes dejarlo en blanco!</li>
            <li>Elige al menos una categoría y al menos una plataforma</li>
          </ul>
          <button onClick={() => { onClose(); }}>Close</button>
        </> 
        );
      default:
        return (
          <>
            {showDefault && (
            // <img src="/src/assets/gif/loading.gif" alt="GIF" />
            <>
            <h2 className="Modal-Title">Leveling Up...</h2>
            <progress className="loading-bar"></progress>
            </>
            )}
          </>
        );
    }
  };

  return (
    <>
      {visible && (
        <div className="modal">
          <div className="modal-content">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;