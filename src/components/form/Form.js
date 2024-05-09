import React, { useState } from 'react';
import Modal from '../mdal/modal';

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleClear = () => {
        setModalMessage('Are you sure you want to clear the form?');
        setModalOpen(true);
    };

    const handleSubmit = () => {
        setModalMessage('Are you sure you want to submit?');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const confirmModal = () => {
        if (modalMessage.includes('submit')) {
            console.log('Submitting:', { email, password });
            // Here you would typically handle the submission to your backend
        } else {
            setEmail('');
            setPassword('');
        }
        closeModal();
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email"
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>

            <Modal
                isOpen={modalOpen}
                message={modalMessage}
                onClose={closeModal}
                onConfirm={confirmModal}
            />
        </div>
    );
}

export default Form;
