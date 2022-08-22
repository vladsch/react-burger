import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { compose, createStore, applyMiddleware, Action, AnyAction } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState } from "./reducers/reducers";
import createSocketMiddleware from "../middlewares/SocketMiddleware";
import {allOrdersWsActions, userOrdersWsActions} from "./actions/wsActions";
import {wsAllOrdersUrl, wsUserOrdersUrl} from "../utils/consts";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (config: object) => typeof compose;
    }
}

const composeEnhancers =
    typeof window === "object" && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const publicOrdersMiddleware = createSocketMiddleware(wsAllOrdersUrl, allOrdersWsActions);
const privateOrdersMiddleware = createSocketMiddleware(wsUserOrdersUrl, userOrdersWsActions, true);
const enhancer = composeEnhancers(applyMiddleware(thunk, publicOrdersMiddleware, privateOrdersMiddleware));

export const store = createStore(rootReducer, enhancer);

export type AppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>