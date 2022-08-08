import {
    makeOrderRequest
} from "../../utils/api";
import {IOrder} from "../../definitions/models/IOrder";
import {IIngredient} from "../../definitions/models/IIngredient";

export const MAKE_ORDER_PROGRESS = "MAKE_ORDER_PROGRESS";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const REORDER_INGREDIENT = "REORDER_INGREDIENT";
export const CLEAR = "CLEAR";

export function makeOrder(ingredients: IIngredient[], callback: (data: IOrder | null) => void) {
    return function (dispatch) {
        dispatch({
            type: MAKE_ORDER_PROGRESS
        });

        makeOrderRequest(ingredients)
            .then((response) => {
                if (response && response.success) {
                    dispatch({
                        type: MAKE_ORDER_SUCCESS,
                        order: response.order
                    });

                    dispatch({
                        type: CLEAR
                    });

                    if (callback) {
                        callback(response.order);
                    }
                }
            })
            .catch(() => {
                dispatch({
                    type: MAKE_ORDER_FAILED
                });
                if (callback) {
                    callback(null);
                }
            });
    };
}

export function addBun(ingredient: IIngredient) {
    return {
        type: ADD_BUN,
        ingredient
    };
}

export function addIngredient(ingredient: IIngredient) {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
}

export function removeIngredient(index: number) {
    return {
        type: REMOVE_INGREDIENT,
        index,
    };
}

export function reorderIngredient(from: number, to: number) {
    return {
        type: REORDER_INGREDIENT,
        from,
        to,
    };
}