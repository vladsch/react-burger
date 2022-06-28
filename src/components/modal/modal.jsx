import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

function Modal({title, onClose, children}) {
    React.useEffect(() => {
        const close = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', close);
        return () => {
            document.removeEventListener('keydown', close);
        };
    }, [onClose]);

    return ReactDom.createPortal(
        <>
            <ModalOverlay onClose={onClose}>
            </ModalOverlay>
            <div className={`${styles.modal} p-10`}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </div>
        </>,
        document.getElementById('modals')
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Modal;