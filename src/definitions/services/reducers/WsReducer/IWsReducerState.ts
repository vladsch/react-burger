import { IOrder } from "../../../models/IOrder";

export interface IWsReducerState {
  wsAllOrdersConnected: boolean,
  wsUserOrdersConnected: boolean,

  allOrders: Array<IOrder>,
  userOrders: Array<IOrder>,
  total: number,
  totalToday: number,
}