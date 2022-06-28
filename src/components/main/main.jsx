import React from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from "prop-types";
import BURGER_PROP_TYPES from "../../utils/propTypes";

function Main({ingredients}) {
    return (
        <main className={styles.main}>
            <h1 className={`${styles.header} text text_type_main-large pl-2 pr-2 pb-5 pt-10`}>
                Cоберите бургер
            </h1>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
        </main>
    );
};

Main.propTypes = {
    ingredients: PropTypes.arrayOf(BURGER_PROP_TYPES.ingredient).isRequired,
};

export default Main;