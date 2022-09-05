import React from 'react';
import styles from './ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {DRAG_TYPES} from "../../definitions/enums/DragTypes";
import {useAppSelector} from "../../services/store";
import {IIngredientProps} from "../../definitions/components/IIngredientProps";

function Ingredient({data}: IIngredientProps) {
    let count = useAppSelector(store=> store.order.ingredients.filter(item => item._id === data._id).length);
    const bun = useAppSelector(store => store.order.bun);
    if(bun && (data._id === bun._id)){
        count = 2;
    }

    const [{ isDrag }, dragRef] = useDrag({
        type: DRAG_TYPES.FROM_CARD,
        item: { _id: data._id },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const location = useLocation();

    return (
        <li className={`burger-ingredient burger-ingredient-${data.type} ${styles.ingredient} pl-3 pb-8 ${isDrag ? styles.isDragging : ''}`} data-ingredient-id={data._id} ref={dragRef}>
            <Link
                className={styles.link}
                to={{
                    pathname: `/ingredients/${data._id}`,
                    state: { page: location }
                }}
            >
                <img src={data.image} alt={data.name} />
                <span className={`${styles.price} text text_type_digits-default pr-1`}>
                        {data.price}
                    </span>
                <CurrencyIcon type='primary' />
                <p className='text text_type_main-default'>
                    {data.name}
                </p>
                {count ? (<Counter count={count} size='small' />) : ''}
            </Link>
        </li>
    );
}

export default Ingredient;