import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { authReducer } from "./authReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
    ws: wsReducer
});

export type RootState = ReturnType<typeof rootReducer>;