import React, { useEffect } from 'react';
import reactDom from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';

function Modal({
    children, title, onSubmit, onClose, show,
}) {
    // Function to be called on Esc key press and close modal
    function closeOnEscKeyPress(e) {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    }

    useEffect(() => {
        // Check for Esc key press and call "closeOnEscKeyPress" function
        document.addEventListener('keydown', closeOnEscKeyPress);

        // Cleanup function for eventListener
        return function cleanUp() {
            document.body.removeEventListener('keydown', closeOnEscKeyPress);
        };
    }, []);

    return reactDom.createPortal(
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className={`custom__modal ${show ? 'show' : ''}`} onClick={onClose} role="none">
                <div className="custom__modal__content" onClick={(e) => e.stopPropagation()} role="none">
                    <div className="custom__modal__header">
                        <h3>{title}</h3>
                    </div>

                    <div className="custom__modal__body">
                        {children}
                    </div>

                    <div className="custom__modal__footer">
                        <button type="button" className="close_button" onClick={onClose}>Close</button>
                        <button type="submit" className="submit_button" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('modal'),
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};

export default Modal;
