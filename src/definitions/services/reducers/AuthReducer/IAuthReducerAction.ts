import {IErrorAction} from "../IErrorAction";
import {IAction} from "../IAction";

export interface IAuthReducerAction extends IAction, IErrorAction {
    name?: string;
    email?: string;
}