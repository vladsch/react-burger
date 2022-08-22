import React, {useEffect} from "react";
import pagesStyles from "./pages.module.css";
import styles from "./profileOrders.module.css";
import ProfileMenu from "../components/profile-menu/profile-menu";
import {IIngredient} from "../definitions/models/IIngredient";
import {RootState} from "../services/reducers/reducers";
import {useAppDispatch, useAppSelector} from "../services/store";
import {WS_USER_ORDERS_CONNECTION_CLOSED, WS_USER_ORDERS_CONNECTION_START} from "../services/actions/wsActions";
import OrdersTape from "../components/orders-tape/orders-tape";

export default function ProfileOrdersPage() {
    const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.ingredients);
    const { userOrders } = useAppSelector((store: RootState) => store.ws);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: WS_USER_ORDERS_CONNECTION_START });

        return (() => {
            dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
        });
    }, [dispatch]);

  return (
      <section className={pagesStyles.page}>
          <ProfileMenu />
          <div className={`ml-15 ${styles.orders}`}>
              <OrdersTape orders={userOrders} originalIngredients={originalIngredients} />
          </div>
      </section>
  );
}