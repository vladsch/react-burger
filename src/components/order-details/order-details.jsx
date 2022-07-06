import React from 'react';
import styles from './order-details.module.css';
import {ReactComponent as OrderImage} from '../../images/order.svg';
import BURGER_PROP_TYPES from "../../utils/propTypes";

function OrderDetails({order}) {
    return (
        <div className={`${styles.container} p-12`}>
            <p className={`${styles.orderNumber} text text_type_digits-large pb-5`}>{order.number}</p>
            <p className='text text_type_main-default'>идентификатор заказа</p>
            <div className={`${styles.image} pt-15 pb-15`}>
                <OrderImage />
            </div>
            <p className='text text_type_main-default pb-3'>
                Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-default text_color_inactive pb-5`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

OrderDetails.propTypes = {
    order: BURGER_PROP_TYPES.order.isRequired
}

export default OrderDetails;