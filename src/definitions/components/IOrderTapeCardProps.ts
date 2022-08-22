import { IIngredient } from "../models/IIngredient";
import { IOrder } from "../models/IOrder";

export interface IOrderTapeCardProps {
  order: IOrder;
  originalIngredients: Array<IIngredient>;
}