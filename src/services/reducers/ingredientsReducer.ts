import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_PROGRESS,
    GET_INGREDIENTS_SUCCESS,
    SET_ACTIVE_TAB
} from "../actions/ingredientsActions";
import {IIngredientsReducerState} from "../../definitions/services/reducers/IngredientsReducer/IIngredientsReducerState";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";
import {IIngredientsReducerAction} from "../../definitions/services/reducers/IngredientsReducer/IIngredientsReducerAction";

export const initialState: IIngredientsReducerState = {
    ingredients: [],
    activeTab: INGREDIENT_TYPE.BUN,
    isLoaded: false,
    ingredientsProgress: false,
    ingredientsSuccess: false,
    ingredientsFailed: false
};

export const ingredientsReducer = (state: IIngredientsReducerState = initialState, action: IIngredientsReducerAction): IIngredientsReducerState => {
    switch (action.type) {
        case GET_INGREDIENTS_PROGRESS: {
            return {
                ...state,
                ingredientsProgress: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients ?? [],
                ingredientsProgress: false,
                ingredientsSuccess: true,
                ingredientsFailed: false,
                isLoaded: true
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsProgress: false,
                ingredientsSuccess: false,
                ingredientsFailed: true,
            };
        }

        case SET_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: action.activeTab ?? INGREDIENT_TYPE.BUN,
            };
        }
        default: {
            return state;
        }
    }
};
