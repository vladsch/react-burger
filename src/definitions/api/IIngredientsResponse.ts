import {IIngredient} from "../models/IIngredient";

export interface IIngredientsResponse {
  success: boolean;
  data: IIngredient[];
}