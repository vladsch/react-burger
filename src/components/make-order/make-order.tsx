import React, {useMemo, useState} from 'react';
import styles from './make-order.module.css';
import {
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {makeOrder} from "../../services/actions/orderActions";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {Button} from "../../definitions/overrides/Button";

function MakeOrder() {
    const ingredients = useAppSelector(store => store.order.ingredients);
    const bun = useAppSelector(store => store.order.bun);
    const total = useMemo(() => {
        const cost = (bun && bun.price) ? bun.price * 2 : 0;
        return ingredients.reduce((prev, next) => prev + next.price, cost);
    }, [ingredients, bun]);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>('');
    const dispatch = useAppDispatch();
    const auth = useAppSelector((store) => store.auth);
    const history = useHistory();

    const onMakeOrder = () => {
        if (!auth.isAuthorized) {
            history.replace({
                pathname: '/login',
                state: '/'
            });
            return;
        }

        setShowModal(true);

        setModalContent((
            <p className={`${styles.info} text text_type_main-large`}>
                Оформляем заказ...
            </p>
        ));

        if (bun) {
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
        }
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
}

export default MakeOrder