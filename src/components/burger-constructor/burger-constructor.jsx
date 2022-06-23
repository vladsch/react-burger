import React from 'react';
import styles from './burger-constructor.module.css';
import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import MakeOrder from "../make-order/make-order";
import PropTypes from "prop-types";
import BURGER_PROP_TYPES from "../../utils/propTypes";

function BurgerConstructor({ingredients}) {
    const [bun, setBun] = React.useState(null);
    const [toppings, setToppings] = React.useState(null);

    React.useEffect(() => {
        setBun(ingredients.find(item => item.type === 'bun'));
        setToppings(ingredients.filter(item => item.type !== 'bun'));
    }, [ingredients]);

    return (
        <div className={styles.list}>
            {bun && (
                <section className={`mb-4 pr-4`}>
                    <ConstructorElement
                        type='top'
                        thumbnail={bun.image_mobile}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        isLocked={true}
                    />
                </section>
            )}

            {toppings && (
                <section className={'ml-1'}>
                    <ul className={styles.toppings}>
                        {toppings.map((ingredient) => (
                            <li className={`${styles.topping} pr-2 mb-2`} key={ingredient._id}>
                                   <span className={styles.dragIcon}>
                                       <DragIcon type='primary' />
                                   </span>
                                <ConstructorElement
                                    thumbnail={ingredient.image_mobile}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    isLocked={false}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {bun && (
                <section className={`mb-4 pr-4`}>
                    <ConstructorElement
                        type='bottom'
                        thumbnail={bun.image_mobile}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        isLocked={true}
                    />
                </section>
            )}

            <MakeOrder total={610} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(BURGER_PROP_TYPES.ingredient).isRequired
};

export default BurgerConstructor;