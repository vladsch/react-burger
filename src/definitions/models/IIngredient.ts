import {INGREDIENT_TYPE} from "../enums/IngredientType";

export interface IIngredient {
  _id: string;
  key?: string,
  name: string;
  type: INGREDIENT_TYPE;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}