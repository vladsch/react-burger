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

class HeaderLink extends React.Component
{
    map = {
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
    }

    getIcon = () => {
        const Icon = this.map[this.props.icon];
        return (<Icon type={this.props.inactive ? 'inactive' : 'primary'} />);
    }

    render() {
        return (
            <p className={`${styles.link} pl-5 pr-5 mr-1`}>
                {this.getIcon()}
                <span className={`text text_type_main-default ml-2 ${this.props.inactive && 'text_color_inactive'}`}>
                    {this.props.children}
                </span>
            </p>
        );
    }
}

HeaderLink.propTypes = {
    icon: PropTypes.string.isRequired,
    inactive: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default HeaderLink;