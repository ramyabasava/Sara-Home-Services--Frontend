import React from 'react';
import { BsX } from 'react-icons/bs';

// The Modal component takes three props:
// isOpen: a boolean to control if the modal is visible
// onClose: a function to call when the modal should be closed
// children: any content you want to display inside the modal
const Modal = ({ isOpen, onClose, children }) => {
  // If the modal isn't open, render nothing
  if (!isOpen) {
    return null;
  }

  // If it is open, render the modal structure
  return (
    // The modal-backdrop is the semi-transparent dark background
    <div className="modal-backdrop">
      {/* The modal-content is the white box in the center */}
      <div className="modal-content">
        {/* A close button in the top-right corner */}
        <button className="modal-close-btn" onClick={onClose}>
          <BsX size={30} />
        </button>
        {/* The content passed to the modal will be rendered here */}
        {children}
      </div>
    </div>
  );
};

export default Modal;