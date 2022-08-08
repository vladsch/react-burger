import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;