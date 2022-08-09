import {
    getIngredientsRequest
} from "../../utils/api";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";
import {IIngredientsReducerAction} from "../../definitions/services/reducers/IngredientsReducer/IIngredientsReducerAction";
import {AppThunk} from "../store";
import {IIngredient} from "../../definitions/models/IIngredient";

export const GET_INGREDIENTS_PROGRESS = "GET_INGREDIENTS_PROGRESS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export function getIngredients(callback?: (data: IIngredient[] | null) => void): AppThunk {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_PROGRESS
        });

        getIngredientsRequest()
            .then((response) => {
                if (response && response.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: response.data
                    });

                    if (callback) {
                        callback(response.data);
                    }
                }
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });

                if (callback) {
                    callback(null);
                }
            });
    };
}

export function setActiveTab(activeTab: INGREDIENT_TYPE): IIngredientsReducerAction {
    return {
        type: SET_ACTIVE_TAB,
        activeTab,
    };
}