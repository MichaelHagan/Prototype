// Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlays">
      <div className="modal">
        <div className="modal-content">
          <FaTimes className='close-modal' onClick={onClose} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
