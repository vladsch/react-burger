import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';

class BurgerIngredients extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
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
            ]
        };
    }

    render() {
        return (
            <div className={`${styles.container} p-2`}>
                <section className={styles.header}>
                    {this.state.tabs.map((tab, index) => (
                        <Tab value={tab.value} active={tab.value === 'bun'} key={tab.value}>
                            {tab.text}
                        </Tab>
                    ))}
                </section>
                <section className={`${styles.groups} mt-10`}>
                    <IngredientsGroup group='bun' name='Булки' />
                    <IngredientsGroup group='sauce' name='Соусы' />
                    <IngredientsGroup group='main' name='Начинки' />
                </section>
            </div>
        );
    }
}

export default BurgerIngredients;
