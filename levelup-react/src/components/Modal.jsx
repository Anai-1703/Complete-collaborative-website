import { useEffect, useState } from "react";
import "../styles/Modal.css";
import { Header } from "./Header";

const Modal = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showModal && (
        <>
        <Header />
        <div className="modal">
          <div className="modal-content">
            <img src="/src/assets/gif/loading.gif" alt="GIF" />
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Modal;
