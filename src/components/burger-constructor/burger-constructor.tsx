import React from 'react';
import styles from './burger-constructor.module.css';
import {
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import MakeOrder from "../make-order/make-order";
import {useDrop} from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {addBun, addIngredient} from "../../services/actions/orderActions";
import ToppingConstructorElement from "../topping-constructor-element/topping-constructor-element";
import {DRAG_TYPES} from "../../definitions/enums/DragTypes";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {IIngredient} from "../../definitions/models/IIngredient";

function BurgerConstructor() {
    const toppings = useAppSelector(store => store.order.ingredients);
    const bun = useAppSelector(store => store.order.bun);
    const dispatch = useAppDispatch();
    const noItems = toppings.length === 0 && !bun;
    const ingredients = useAppSelector(store => store.ingredients.ingredients);

    const [, dropRef] = useDrop<IIngredient>({
        accept: DRAG_TYPES.FROM_CARD,
        drop: (item) => {
            const ingredient = ingredients.find(ingredient => ingredient._id === item._id);

            if (ingredient) {
                if (ingredient.type === INGREDIENT_TYPE.BUN) {
                    dispatch(addBun({...ingredient}));
                } else {
                    const key: string = uuidv4();
                    dispatch(addIngredient({ ...ingredient, key }));
                }
            }
        },
    });

    return (
        <div className={`constructor-ingredients ${styles.list}`} ref={dropRef}>
            {noItems && (
                <p className={`${styles.info} text text_color_inactive text_type_main-large ml-4 mt-25`}>
                    Для оформления заказа добавьте ингредиенты из области слева
                </p>
            )}

            {bun && (
                <section className={`constructor-ingredient constructor-ingredient-bun mb-4 pr-4`}>
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
                        {toppings.map((ingredient, index) => (
                            <ToppingConstructorElement ingredient={ingredient} index={index} key={ingredient.key} />
                        ))}
                    </ul>
                </section>
            )}

            {bun && (
                <section className={`constructor-ingredient constructor-ingredient-bun mb-4 pr-4`}>
                    <ConstructorElement
                        type='bottom'
                        thumbnail={bun.image_mobile}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        isLocked={true}
                    />
                </section>
            )}

            <MakeOrder />
        </div>
    );
};

export default BurgerConstructor;