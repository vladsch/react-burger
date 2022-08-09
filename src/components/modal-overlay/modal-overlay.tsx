import React from 'react';
import styles from './modal-overlay.module.css';
import {IModalOverlayProps} from "../../definitions/components/IModalOverlayProps";

function ModalOverlay({onClose, children}: IModalOverlayProps) {
    const overlayRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className={styles.overlay} onClick={onClose} ref={overlayRef}>
            {children}
        </div>
    );
}

export default ModalOverlay;