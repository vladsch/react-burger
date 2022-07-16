import {
    MAKE_ORDER_PROGRESS,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_FAILED,
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REORDER_INGREDIENT,
    CLEAR,
} from "../actions/orderActions";

const initialState = {
    bun: null,
    ingredients: [],
    order: null,
    orderProgress: false,
    orderSuccess: false,
    orderFailed: false,
    totalPrice: 0,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingredient,
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
            };
        }
        case REMOVE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.index, 1);
            return {
                ...state,
                ingredients
            };
        }
        case REORDER_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.to, 0, ingredients.splice(action.from, 1)[0]);
            return {
                ...state,
                ingredients
            };
        }
        case CLEAR: {
            return {
                ...state,
                bun: null,
                ingredients: [],
            };
        }
        case MAKE_ORDER_PROGRESS: {
            return {
                ...state,
                orderProgress: true,
                order: null
            };
        }
        case MAKE_ORDER_SUCCESS: {
            return {
                ...state,
                orderProgress: false,
                orderSuccess: true,
                orderFailed: false,
                order: action.response.order,
            };
        }
        case MAKE_ORDER_FAILED: {
            return {
                ...state,
                orderProgress: false,
                orderSuccess: false,
                orderFailed: true,
                order: null
            };
        }
        default: {
            return state;
        }
    }
};
