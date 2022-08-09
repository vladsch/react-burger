import React from 'react';
import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {IModalHeaderProps} from "../../definitions/components/IModalHeaderProps";

function ModalHeader({title, onClose}: IModalHeaderProps) {
    return (
        <div className={styles.header}>
            <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
            <button className={styles.button} onClick={onClose}>
                <CloseIcon type='primary' />
            </button>
        </div>
    );
}

export default ModalHeader;