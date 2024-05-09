import React from 'react';
// import './Modal.scss';  // Assuming you have some basic styles for the modal

function Modal({ isOpen, message, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
}

export default Modal;
