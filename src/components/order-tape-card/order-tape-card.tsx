import styles from './order-tape-card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIconList from "../ingredient-icon-list/ingredient-icon-list";
import {getDate, getOrderTotalCost, getReadableOrderStatus} from "../../utils/helpers";
import {IIngredient} from "../../definitions/models/IIngredient";
import {IOrderTapeCardProps} from "../../definitions/components/IOrderTapeCardProps";
import {ORDER_STATUS} from "../../definitions/enums/OrderStatus";
import {useMemo} from "react";

const OrderTapeCard = ({ order, originalIngredients }: IOrderTapeCardProps): JSX.Element => {
  const {ingredients} = order;
  const mappedIngredients: Array<IIngredient> = useMemo(() => {
      return ingredients
          .map(item => originalIngredients.find(original => original._id === item))
          .filter(item => item !== undefined) as Array<IIngredient>;
  }, [ingredients, originalIngredients]);

  return (
      <div className={ `pt-6 pb-6 pl-6 pr-6 ${ styles.container }` }>
        <div className={ styles.spaceBetween }>
          <p className="text text_type_digits-default">#{ order.number }</p>
          <p className="text text_type_main-default text_color_inactive">{getDate(order.createdAt)}</p>
        </div>
        <p className="mt-6 text text_type_main-medium">
          { order.name }
        </p>
        <p className={`mt-2 text text_type_main-default ${order.status === ORDER_STATUS.DONE ? styles.statusDone : ''}`}>
          {getReadableOrderStatus(order.status)}
        </p>
        <div className={ `mt-6 ${ styles.spaceBetween }` }>
          { mappedIngredients && <IngredientIconList ingredients={ mappedIngredients }/> }
          <div className={ `ml-6 ${ styles.spaceBetween }` }>
            <p className="mr-2 text text_type_digits-default">{getOrderTotalCost(mappedIngredients)}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
  );
}

export default OrderTapeCard;