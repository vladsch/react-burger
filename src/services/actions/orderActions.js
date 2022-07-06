import {
    makeOrderAsync
} from "../../utils/api";

export const MAKE_ORDER_PROGRESS = "MAKE_ORDER_PROGRESS";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const REORDER_INGREDIENT = "REORDER_INGREDIENT";
export const CLEAR = "CLEAR";

export function makeOrder(ingredients, callback) {
    return function (dispatch) {
        dispatch({
            type: MAKE_ORDER_PROGRESS
        });

        makeOrderAsync(ingredients)
            .then((response) => {
                if (response && response.success) {
                    dispatch({
                        type: MAKE_ORDER_SUCCESS,
                        response
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

export function addBun(ingredient) {
    return {
        type: ADD_BUN,
        ingredient
    };
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
}

export function removeIngredient(index) {
    return {
        type: REMOVE_INGREDIENT,
        index,
    };
}

export function reorderIngredient(from, to) {
    return {
        type: REORDER_INGREDIENT,
        from,
        to,
    };
}