import { useEffect, useState } from "react";
import "../styles/Modal.css";


const Modal = ({ type, visible, onClose }) => {
  const [showDefault, setShowDefault] = useState(true);

  useEffect(() => {
    if (visible) {
      setShowDefault(true);

      const timeout = setTimeout(() => {
        setShowDefault(false); // Ocultar el contenido predeterminado después de 7 segundos
        onClose(); // Llamar al onClose después de ocultar el contenido predeterminado
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);


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
          <button onClick={closeModal}>Close</button>
        </>
        );
      default:
        return (
          <>
            {showDefault && (
            <img src="/src/assets/gif/loading.gif" alt="GIF" />
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