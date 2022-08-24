import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './order-tape-card-details.module.css';
import { getDate } from "../../utils/helpers";
import { getOrderTotalCost, getReadableOrderStatus, getUniqueOrderIngredients } from "../../utils/helpers";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_ALL_ORDERS_CONNECTION_CLOSED, WS_ALL_ORDERS_CONNECTION_START } from "../../services/actions/wsActions";
import OrderTapeCardDetailsIngredient from "../order-tape-card-details-ingredient/order-tape-card-details-ingredient";
import { IOrderTapCardDetailParams } from "../../definitions/components/IOrderTapCardDetailParams";
import { RootState } from "../../services/reducers/reducers";
import { IIngredient } from "../../definitions/models/IIngredient";
import { IOrder } from "../../definitions/models/IOrder";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";

const OrderTapeCardDetails = (): JSX.Element => {
  const { id } = useParams<IOrderTapCardDetailParams>();
  const dispatch = useAppDispatch();
  const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.ingredients);
  const { allOrders } = useAppSelector((store: RootState) => store.ws);
  const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>();
  const [mappedIngredients, setMappedIngredients] = useState<Array<IIngredient> | undefined>();

  useEffect(() => {
    dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_ALL_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (allOrders) {
      setCurrentOrder(allOrders.find(item => item._id === id));
    }
  }, [allOrders, id]);

  useEffect(() => {
    const mappedIngredients: Array<IIngredient> = currentOrder?.ingredients
      .map(item => originalIngredients.find(original => original._id === item))
      .filter(item => item) as Array<IIngredient>;

    setMappedIngredients(mappedIngredients);
  }, [dispatch, originalIngredients, currentOrder]);

  return (
    <div className={ styles.container }>
      { currentOrder && mappedIngredients ?
        (<div>
          <p className="text text_type_digits-default">#{ currentOrder.number }</p>
          <p className="mt-10 text text_type_main-medium">{ currentOrder.name }</p>
          <p className={`mt-3 text text_type_main-default ${styles.status}`}>{ getReadableOrderStatus(currentOrder.status) }</p>
          <p className="mt-15 text text_type_main-medium">Состав:</p>
          <div className={ `mt-6 pr-6 ${ styles.ingredients }` }>
            { Array.from(getUniqueOrderIngredients(mappedIngredients).values())
              .sort((a, b) => b[0].type === INGREDIENT_TYPE.BUN ? 1 : -1)
              .map((value, index) =>
                (<div key={value[0]._id} className={index !== 0 ? "mt-4" : ""}>
                  <OrderTapeCardDetailsIngredient ingredient={ value[0] } count={ value.length }/>
                </div>)
            ) }
          </div>
          <div className={`mt-10 ${styles.footer}`}>
            <p className="text text_type_main-default text_color_inactive">{ getDate(currentOrder.createdAt) }</p>
            <div className={ styles.price }>
              <p className="text text_type_digits-default mr-2">{ mappedIngredients && getOrderTotalCost(mappedIngredients) }</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>)
        : "Заказ не найден"
      }
    </div>
  );
}

export default OrderTapeCardDetails;