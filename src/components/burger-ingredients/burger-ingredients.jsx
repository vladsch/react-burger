import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import PropTypes from "prop-types";
import BURGER_PROP_TYPES from "../../utils/propTypes";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients({ingredients}) {
    const [tabs] = React.useState([
        {
            value: 'bun',
            text: 'Булки',
            active: true
        },
        {
            value: 'sauce',
            text: 'Соусы',
            active: false
        },
        {
            value: 'main',
            text: 'Начинки',
            active: false
        },
    ]);

    const [selection, setSelection] = React.useState(null);

    const onSelect = (data) => {
        setSelection(data);
    };

    const onCloseClick = () => {
        setSelection(null);
    };

    const bunItems = React.useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
    const sauceItems = React.useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
    const mainItems = React.useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

    return (
        <>
            <div className={`${styles.container} p-2`}>
                <section className={styles.header}>
                    {tabs.map((tab, index) => (
                        <Tab value={tab.value} active={tab.value === 'bun'} key={tab.value}>
                            {tab.text}
                        </Tab>
                    ))}
                </section>
                <section className={`${styles.groups} mt-10`}>
                    <IngredientsGroup group='bun' name='Булки' items={bunItems} onSelect={onSelect} />
                    <IngredientsGroup group='sauce' name='Соусы' items={sauceItems} onSelect={onSelect}/>
                    <IngredientsGroup group='main' name='Начинки' items={mainItems} onSelect={onSelect}/>
                </section>
            </div>
            {selection && (
                <Modal onClose={onCloseClick} title={'Детали ингредиента'}>
                    <IngredientDetails ingredient={selection} />
                </Modal>
            )}
        </>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(BURGER_PROP_TYPES.ingredient).isRequired
};

export default BurgerIngredients;
