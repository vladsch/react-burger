import styles from './feed.module.css';
import React, { useEffect } from "react";
import {
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_CONNECTION_START
} from "../services/actions/wsActions";
import { RootState } from "../services/reducers/reducers";
import { IIngredient } from "../definitions/models/IIngredient";
import { useAppDispatch, useAppSelector } from "../services/store";
import OrdersTape from "../components/orders-tape/orders-tape";
import FeedStatistics from "../components/feed-statistics/feed-statistics";

const FeedPage = (): JSX.Element => {
    const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.ingredients);
    const { allOrders, total, totalToday } = useAppSelector((store: RootState) => store.ws);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });

        return (() => {
            dispatch({ type: WS_ALL_ORDERS_CONNECTION_CLOSED });
        });
    }, [dispatch]);

    return (
        <div className={ `mt-8 ${ styles.container }` }>
            <p className={ "text text_type_main-large" }>Лента заказов</p>
            <div className={ `mt-6 ${ styles.innerContainer }` }>
                { allOrders && <OrdersTape orders={ allOrders } originalIngredients={ originalIngredients }/> }
                <div className="ml-15"/>
                { allOrders && <FeedStatistics orders={ allOrders } total={ total } totalToday={ totalToday }/> }
            </div>
        </div>
    )
};

export default FeedPage;