import { IOrder } from "../models/IOrder";
import { IIngredient } from "../models/IIngredient";

export interface IOrdersTapeProps {
  orders: Array<IOrder>;
  originalIngredients: Array<IIngredient>;
}