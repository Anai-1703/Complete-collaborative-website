import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <img src="/src/assets/gif/loading.gif" alt="GIF" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
