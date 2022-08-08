import {IIngredient} from "../../../models/IIngredient";
import {IOrder} from "../../../models/IOrder";

export interface IOrderReducerState {
  bun: IIngredient | null;
  ingredients: IIngredient[];
  order: IOrder | null;
  orderProgress: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
  totalPrice: number;
}