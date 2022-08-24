import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";
import { IOrder } from "../../../models/IOrder";

export interface IPayload {
  orders: Array<IOrder>;
  total?: number;
  totalToday?: number;
}

export interface IWsReducerAction extends IAction, IErrorAction {
  payload?: IPayload;
}