import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

function Modal({title, onClose, children}) {
    React.useEffect(() => {
        const close = e => {
            if (e.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', close);
        return () => {
            document.removeEventListener('keydown', close);
        };
    }, [onClose]);

    return ReactDom.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={`${styles.modal} p-10`}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </div>
        </ModalOverlay>,
        document.body
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Modal;