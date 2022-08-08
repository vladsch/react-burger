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
import {NavLink, useLocation} from "react-router-dom";
import {IHeaderLinkProps} from "../../definitions/components/IHeaderLinkProps";

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

function HeaderLink({icon, path, children}: IHeaderLinkProps) {
    const { pathname } = useLocation();
    const inactive = pathname !== path

    const renderIcon = () => {
        const Icon = map[icon];
        return (<Icon type={inactive ? 'secondary' : 'primary'} />);
    };

    return (
        <NavLink
            to={path}
            activeClassName={`${styles.link} pl-5 pr-5 mr-1`}
            className={`${styles.link} inactive pl-5 pr-5 mr-1`}>
            <p>
                {renderIcon()}
                <span className={`text text_type_main-default ml-2 ${inactive ? 'text_color_inactive' : ''}`}>
                    {children}
                </span>
            </p>
        </NavLink>
    );
};

export default HeaderLink;