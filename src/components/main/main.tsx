import React from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main(): JSX.Element {
    return (
        <main className={styles.main}>
            <h1 className={`${styles.header} text text_type_main-large pl-2 pr-2 pb-5 pt-10`}>
                Cоберите бургер
            </h1>
            <BurgerIngredients  />
            <BurgerConstructor  />
        </main>
    );
};

export default Main;