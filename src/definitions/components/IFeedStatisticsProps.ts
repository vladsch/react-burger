import { IOrder } from "../models/IOrder";

export interface IFeedStatisticsProps {
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}