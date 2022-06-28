import React from 'react';
import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function ModalHeader({title, onClose}) {
    return (
        <div className={styles.header}>
            <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
            <button className={styles.button} onClick={onClose}>
                <CloseIcon type='primary' />
            </button>
        </div>
    );
};

ModalHeader.protoTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalHeader;