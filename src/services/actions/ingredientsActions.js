import {
    getIngredientsAsync
} from "../../utils/api";

export const GET_INGREDIENTS_PROGRESS = "GET_INGREDIENTS_PROGRESS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const OPEN_DETAILS = "OPEN_DETAILS";
export const CLOSE_DETAILS = "CLOSE_DETAILS";


export function getIngredients(callback) {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_PROGRESS
        });

        getIngredientsAsync()
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

export function setActiveTab(activeTab) {
    return {
        type: SET_ACTIVE_TAB,
        activeTab,
    };
}

export function openDetails(data) {
    return {
        type: OPEN_DETAILS,
        data,
    };
}

export function closeDetails() {
    return {
        type: CLOSE_DETAILS
    };
}