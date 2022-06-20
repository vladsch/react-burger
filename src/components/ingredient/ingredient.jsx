import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

class Ingredient extends React.Component
{
    render() {
        return (
            <li className={`${styles.ingredient} pl-3 pb-8`}>
                <img src={this.props.data.image} alt='' />
                <span className={`${styles.price} text text_type_digits-default pr-1`}>
                    {this.props.data.price}
                </span>
                <CurrencyIcon type='primary' />
                <p className='text text_type_main-default'>
                    {this.props.data.name}
                </p>
                <Counter count={1} size='small' />
            </li>
        );
    }
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default Ingredient;