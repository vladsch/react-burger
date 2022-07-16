import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer.js";
import { orderReducer } from "./orderReducer.js";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer
});