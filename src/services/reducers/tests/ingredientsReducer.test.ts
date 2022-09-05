import {ingredientsReducer} from "../ingredientsReducer";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_PROGRESS,
  GET_INGREDIENTS_SUCCESS,
  SET_ACTIVE_TAB
} from "../../actions/ingredientsActions";
import {IIngredientsReducerState} from "../../../definitions/services/reducers/IngredientsReducer/IIngredientsReducerState";
import {IIngredient} from "../../../definitions/models/IIngredient";
import {INGREDIENT_TYPE} from "../../../definitions/enums/IngredientType";

const initialState: IIngredientsReducerState = {
  ingredients: [],
  activeTab: INGREDIENT_TYPE.BUN,
  isLoaded: false,
  ingredientsProgress: false,
  ingredientsSuccess: false,
  ingredientsFailed: false
}

test('should return the initial state ingredients reducer', () => {
  expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should handle get ingredients request', () => {
  const resultState: IIngredientsReducerState = { ...initialState, ingredientsProgress: true };

  expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_PROGRESS })).toEqual(resultState);
});

test('should handle get ingredients request success', () => {
  const ingredients: Array<IIngredient> = [{} as IIngredient, {} as IIngredient, {} as IIngredient];
  const previousState: IIngredientsReducerState = {
    ...initialState,
    ingredientsProgress: true,
    ingredientsFailed: true,
    ingredientsSuccess: false
  };
  const resultState: IIngredientsReducerState = {
    ...initialState,
    isLoaded: true,
    ingredientsProgress: false,
    ingredientsFailed: false,
    ingredientsSuccess: true,
    ingredients: ingredients
  };

  expect(ingredientsReducer(previousState, {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients
  })).toEqual(resultState);
});

test('should handle get ingredients request failed', () => {
  const error: string = 'error';
  const previousState: IIngredientsReducerState = { ...initialState, ingredientsProgress: true };
  const resultState: IIngredientsReducerState = {
    ...initialState,
    ingredientsProgress: false,
    ingredientsFailed: true
  };

  expect(ingredientsReducer(previousState, { type: GET_INGREDIENTS_FAILED })).toEqual(resultState);
});

test('should handle set active tab bun', () => {
  const previousState: IIngredientsReducerState = { ...initialState };
  const resultState: IIngredientsReducerState = {
    ...initialState,
    activeTab: INGREDIENT_TYPE.BUN
  };

  expect(ingredientsReducer(previousState, { type: SET_ACTIVE_TAB })).toEqual(resultState);
});

test('should handle set active tab sauce', () => {
  const previousState: IIngredientsReducerState = { ...initialState };
  const resultState: IIngredientsReducerState = {
    ...initialState,
    activeTab: INGREDIENT_TYPE.SAUCE
  };

  expect(ingredientsReducer(previousState, { type: SET_ACTIVE_TAB, activeTab: INGREDIENT_TYPE.SAUCE })).toEqual(resultState);
});
