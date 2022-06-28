import React from 'react';
import PropTypes from 'prop-types';
import styles from './make-order.module.css';
import {
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function MakeOrder({total}) {
    const [orderNumber, setOrderNumber] = React.useState(null);

    const onMakeOrder = () => {
        setOrderNumber('034536');
    };

    const onCloseClick = () => {
        setOrderNumber(null);
    };

    return (
        <section className={`${styles.body} pr-3 pl-3 pt-5`}>
            <div className={`${styles.total} pr-3`}>
               <span className={`${styles.totalText} text text_type_digits-default pr-1`}>
                 {total}
               </span>
                <CurrencyIcon type='primary' />
            </div>
            <Button type='primary' size='large' onClick={onMakeOrder}>
                Оформить заказ
            </Button>
            {orderNumber && (
                <Modal onClose={onCloseClick}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            )}
        </section>
    );
};

MakeOrder.propTypes = {
    total: PropTypes.number.isRequired
};

export default MakeOrder