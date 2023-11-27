import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const Modal = ({ onClose, children, title }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const handleOverlayClick = (e) => {
    // Check if the click event occurred on the modal overlay (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    // Attach a click event listener to the modal overlay
    document.addEventListener("click", handleOverlayClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {/* {title && <h1>{title}</h1>} */}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
