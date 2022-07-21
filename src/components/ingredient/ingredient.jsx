import React from 'react';
import styles from './ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BURGER_PROP_TYPES from "../../utils/propTypes";
import {useDispatch, useSelector} from "react-redux";
import { openDetails } from '../../services/actions/ingredientsActions';
import { useDrag } from "react-dnd";
import { DRAG_TYPES} from "../../utils/consts";
import {Link, useLocation} from "react-router-dom";

function Ingredient({data}) {
    let count = useSelector(store=> store.order.ingredients.filter(item => item._id === data._id).length);
    const bun = useSelector(store => store.order.bun);
    if(bun && (data._id === bun._id)){
        count = 2;
    }

    const [{ isDrag }, dragRef] = useDrag({
        type: DRAG_TYPES.FROM_CARD,
        item: { id: data._id },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const location = useLocation();

    return (
        <li className={`${styles.ingredient} pl-3 pb-8 ${isDrag ? styles.isDragging : ''}`} ingredient-id={data._id} ref={dragRef}>
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
};

Ingredient.propTypes = {
    data: BURGER_PROP_TYPES.ingredient.isRequired
};

export default Ingredient;