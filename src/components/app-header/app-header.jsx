import React from 'react';
import styles from './app-header.module.css';
import {
    Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from "../header-link/header-link";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function AppHeader() {
    const user = useSelector((store) => store.auth);

    return (
        <header className={styles.header}>
            <nav className={`${styles.body} p-4`}>
                <section>
                    <HeaderLink icon={'BurgerIcon'} path={'/'}>Конструктор</HeaderLink>
                    <HeaderLink icon={'ListIcon'} path={'/feed'}>Лента заказов</HeaderLink>
                </section>

                <section className={styles.logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </section>

                <section>
                    {user.isAuthorized ? (
                        <HeaderLink icon={'ProfileIcon'} path={'/profile'}>{`Личный кабинет`}</HeaderLink>
                    ) : (
                        <HeaderLink icon={'ProfileIcon'} path={'/login'}>Войти</HeaderLink>
                    )}
                </section>
            </nav>
        </header>
    );
};