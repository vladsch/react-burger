import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({onClose, children}) {
    const overlayRef = React.useRef();

    return (
        <div className={styles.overlay} onClick={onClose} ref={overlayRef}>
            {children}
        </div>
    );
};

ModalOverlay.protoTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default ModalOverlay;