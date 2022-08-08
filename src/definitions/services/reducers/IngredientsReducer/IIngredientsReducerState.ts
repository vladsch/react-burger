import {IIngredient} from "../../../models/IIngredient";
import {INGREDIENT_TYPE} from "../../../enums/IngredientType";

export interface IIngredientsReducerState {
  ingredients: Array<IIngredient>;
  activeTab: INGREDIENT_TYPE;
  isLoaded: boolean;
  ingredientsProgress: boolean;
  ingredientsSuccess: boolean;
  ingredientsFailed: boolean;
}