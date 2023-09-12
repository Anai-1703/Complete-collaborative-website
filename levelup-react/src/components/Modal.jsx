import { useEffect, useState } from "react";
import "../styles/Modal.css";

const Modal = ({ type, visible, autoCloseTimeout }) => {
  const [showDefault, setShowDefault] = useState(true);
  const [modalVisible, setModalVisible] = useState(visible);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    let timer;

    if (visible) {
      const title = document.querySelector(".Modal-Title");
      if (title) {
        title.style.animation = "none";
        title.offsetHeight;
        title.style.animation = "colorChange 2s infinite alternate";
      }

      if (autoCloseTimeout) {
        timer = setTimeout(() => {
          closeModal();
        }, autoCloseTimeout);
      }
    }

    return () => clearTimeout(timer);
  }, [autoCloseTimeout, visible]);

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
            <button onClick={closeModal}>Close</button>
          </>
        );
      default:
        return (
          <>
            {showDefault && (
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
      {modalVisible && (
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