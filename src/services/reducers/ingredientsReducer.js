import {
    GET_INGREDIENTS_PROGRESS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_ACTIVE_TAB,
    OPEN_DETAILS,
    CLOSE_DETAILS
} from "../actions/ingredientsActions";

const initialState = {
    ingredients: [],
    activeTab: "bun",
    isLoaded: false,
    ingredientsProgress: false,
    ingredientsSucess: false,
    ingredientsFailed: false,
    detailsData: null
};

export const ingredientsReducer = (state = initialState, action) => {
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
                ingredients: action.ingredients,
                ingredientsProgress: false,
                ingredientsSucess: true,
                ingredientsFailed: false,
                isLoaded: true
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsProgress: false,
                ingredientsSucess: false,
                ingredientsFailed: true,
            };
        }

        case SET_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: action.activeTab,
            };
        }
        case OPEN_DETAILS: {
            return {
                ...state,
                detailsData: action.data,
            };
        }
        case CLOSE_DETAILS: {
            return {
                ...state,
                detailsData: null,
            };
        }
        default: {
            return state;
        }
    }
};
