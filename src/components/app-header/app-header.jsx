import React from 'react';
import styles from './app-header.module.css';
import {
    Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from "../header-link/header-link";

class AppHeader extends React.Component
{
    render() {
        return (
            <header className={styles.header}>
                <nav className={`${styles.body} p-4`}>
                    <section>
                        <HeaderLink icon={'BurgerIcon'}>Конструктор</HeaderLink>
                        <HeaderLink icon={'ListIcon'} inactive={true}>Лента заказов</HeaderLink>
                    </section>

                    <section className={styles.logo}>
                        <Logo />
                    </section>

                    <section>
                        <HeaderLink icon={'ProfileIcon'} inactive={true}>Личный кабинет</HeaderLink>
                    </section>
                </nav>
            </header>
        );
    }
}

export default AppHeader;