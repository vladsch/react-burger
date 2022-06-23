import React from 'react';
import PropTypes from 'prop-types';
import styles from './header-link.module.css';
import {
    CurrencyIcon,
    BurgerIcon,
    LockIcon,
    DragIcon,
    CloseIcon,
    CheckMarkIcon,
    ListIcon,
    ProfileIcon,
    EditIcon,
    InfoIcon,
    ShowIcon,
    HideIcon,
    LogoutIcon,
    DeleteIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MenuIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const map = {
    CurrencyIcon,
    BurgerIcon,
    LockIcon,
    DragIcon,
    CloseIcon,
    CheckMarkIcon,
    ListIcon,
    ProfileIcon,
    EditIcon,
    InfoIcon,
    ShowIcon,
    HideIcon,
    LogoutIcon,
    DeleteIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MenuIcon
};

function HeaderLink({icon, inactive, children}) {
    const renderIcon = () => {
        const Icon = map[icon];
        return (<Icon type={inactive ? 'inactive' : 'primary'} />);
    };

    return (
        <p className={`${styles.link} pl-5 pr-5 mr-1`}>
            {renderIcon()}
            <span className={`text text_type_main-default ml-2 ${inactive ? 'text_color_inactive' : ''}`}>
                {children}
            </span>
        </p>
    );
};

HeaderLink.propTypes = {
    icon: PropTypes.oneOf(Object.keys(map)).isRequired,
    inactive: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default HeaderLink;