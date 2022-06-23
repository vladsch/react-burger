import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BURGER_PROP_TYPES from "../../utils/propTypes";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Ingredient({data, count}) {
    const [selection, setSelection] = React.useState(null);

    const onShowDetails = () => {
        setSelection(data);
    };

    const onCloseClick = () => {
        setSelection(null);
    };

    return (
        <>
            <li className={`${styles.ingredient} pl-3 pb-8`} onClick={onShowDetails}>
                <img src={data.image} alt='' />
                <span className={`${styles.price} text text_type_digits-default pr-1`}>
                    {data.price}
                </span>
                <CurrencyIcon type='primary' />
                <p className='text text_type_main-default'>
                    {data.name}
                </p>
                {count && (<Counter count={count} size='small' />)}
            </li>
            {selection && (
                <Modal onClose={onCloseClick} title={'Детали ингредиента'}>
                    <IngredientDetails ingredient={selection} />
                </Modal>
            )}
        </>
    );
};

Ingredient.propTypes = {
    data: BURGER_PROP_TYPES.ingredient.isRequired
};

export default Ingredient;