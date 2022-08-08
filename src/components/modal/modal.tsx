import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";
import {IModalProps} from "../../definitions/components/IModalProps";

function Modal({title, onClose, children}: IModalProps) {
    React.useEffect(() => {
        const close = e => {
            if (e.key === 'Escape' && onClose) {
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
        document.getElementById('modals') as HTMLElement
    );
}

export default Modal;