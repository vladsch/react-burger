import React from 'react';
import styles from './ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BURGER_PROP_TYPES from "../../utils/propTypes";
import PropTypes from "prop-types";

function Ingredient({data, onSelect, count}) {
    const onClick = () => {
      if (onSelect) {
          onSelect(data);
      }
    };
    return (
        <li className={`${styles.ingredient} pl-3 pb-8`} ingredient-id={data._id} onClick={onClick}>
            <img src={data.image} alt={data.name} />
            <span className={`${styles.price} text text_type_digits-default pr-1`}>
                    {data.price}
                </span>
            <CurrencyIcon type='primary' />
            <p className='text text_type_main-default'>
                {data.name}
            </p>
            {count && (<Counter count={count} size='small' />)}
        </li>
    );
};

Ingredient.propTypes = {
    data: BURGER_PROP_TYPES.ingredient.isRequired,
    count: PropTypes.number,
    onSelect: PropTypes.func
};

export default Ingredient;