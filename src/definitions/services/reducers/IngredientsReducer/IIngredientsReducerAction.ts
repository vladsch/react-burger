import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";
import {IIngredient} from "../../../models/IIngredient";
import {INGREDIENT_TYPE} from "../../../enums/IngredientType";

export interface IIngredientsReducerAction extends IAction, IErrorAction {
  ingredients?: Array<IIngredient>;
  activeTab?: INGREDIENT_TYPE;
}