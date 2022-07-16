import React, {useMemo, useState} from 'react';
import styles from './make-order.module.css';
import {
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useSelector, useDispatch} from "react-redux";
import {makeOrder} from "../../services/actions/orderActions";

function MakeOrder() {
    const ingredients = useSelector(store => store.order.ingredients);
    const bun = useSelector(store => store.order.bun);
    const total = useMemo(() => {
        const cost = (bun && bun.price) ? bun.price * 2 : 0;
        return ingredients.reduce((prev, next) => prev + next.price, cost);
    }, [ingredients, bun]);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const dispatch = useDispatch();

    const onMakeOrder = () => {
        setShowModal(true);

        setModalContent((
            <p className={`${styles.info} text text_type_main-large`}>
                Оформляем заказ...
            </p>
        ));

        dispatch(
            makeOrder([bun, ...ingredients, bun], (order) => {
                if (!order) {
                    setModalContent((
                        <p className={`${styles.info} text text_type_main-large`}>
                            Произошла ошибка при оформлении заказа, попробуйте еще раз
                        </p>
                    ));
                } else {
                    setModalContent((<OrderDetails order={order} />));
                }
            })
        );
    };

    const onCloseClick = () => {
        setShowModal(false);
    };

    return (
        <section className={`${styles.body} pr-3 pl-3 pt-5`}>
            <div className={`${styles.total} pr-3`}>
               <span className={`${styles.totalText} text text_type_digits-default pr-1`}>
                 {total}
               </span>
                <CurrencyIcon type='primary' />
            </div>
            <Button type='primary' size='large' onClick={onMakeOrder} disabled={!bun || !ingredients.length}>
                Оформить заказ
            </Button>
            {showModal && (
                <Modal onClose={onCloseClick}>
                    {modalContent}
                </Modal>
            )}
        </section>
    );
};

export default MakeOrder