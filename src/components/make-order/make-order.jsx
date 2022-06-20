import React from 'react';
import PropTypes from 'prop-types';
import styles from './make-order.module.css';
import {
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

class MakeOrder extends React.Component
{
    render() {
        return (
            <section className={`${styles.body} pr-3 pl-3 pt-5`}>
                <div className={`${styles.total} pr-3`}>
                   <span className={`${styles.totalText} text text_type_digits-default pr-1`}>
                     {this.props.total}
                   </span>
                    <CurrencyIcon type='primary' />
                </div>
                <Button type='primary' size='large'>
                    Оформить заказ
                </Button>
            </section>
        );
    }
}

MakeOrder.propTypes = {
    total: PropTypes.number.isRequired
};

export default MakeOrder;