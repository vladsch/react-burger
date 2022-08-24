import {ORDER_STATUS} from "../enums/OrderStatus";

export interface IOrder {
  _id: string;
  name: string;
  ingredients: Array<string>;
  status: ORDER_STATUS;
  number: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  totalToday: number;
}