import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from './order-tape-card-details-ingredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrderTapeCardDetailsIngredientProps } from "../../definitions/components/IOrderTapeCardDetailsIngredientProps";

const OrderTapeCardDetailsIngredient = ({ ingredient, count }: IOrderTapeCardDetailsIngredientProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <IngredientIcon {...ingredient} />
      <p className={`ml-4 text text_type_main-default ${styles.ingredientName}`}>{ingredient.name}</p>
      <div className={`ml-4 ${styles.ingredientPrice}`}>
        <p className="mr-2 text text_type_digits-default">{count} x {ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

export default OrderTapeCardDetailsIngredient;