import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";
import {IIngredient} from "../../../models/IIngredient";
import {IOrder} from "../../../models/IOrder";

export interface IOrderReducerAction extends IAction, IErrorAction {
  ingredient?: IIngredient;
  index?: number;
  from?: number;
  to?: number;
  order?: IOrder;
}