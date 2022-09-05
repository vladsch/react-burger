import { wsReducer, initialState } from "../wsReducer";
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS_MESSAGE, WS_GET_USER_ORDERS_MESSAGE, WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_SUCCESS
} from "../../actions/wsActions";
import {IWsReducerState} from "../../../definitions/services/reducers/WsReducer/IWsReducerState";
import { IOrder } from "../../../definitions/models/IOrder";

test('should return the initial state ws reducer', () => {
  expect(wsReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should handle successful connection to receive all orders', () => {
  const resultState: IWsReducerState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(initialState, { type: WS_ALL_ORDERS_CONNECTION_SUCCESS })).toEqual(resultState);
});

test('should handle receive all orders connection error', () => {
  const previousState: IWsReducerState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_ALL_ORDERS_CONNECTION_ERROR })).toEqual(initialState);
});

test('should handle receive all orders connection close', () => {
  const previousState: IWsReducerState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_ALL_ORDERS_CONNECTION_CLOSED })).toEqual(initialState);
});

test('should handle to receive all orders message', () => {
  const orders: Array<IOrder> = [{} as IOrder, {} as IOrder, {} as IOrder];
  const total: number = 250;
  const totalToday: number = 400;
  const resultState = { ...initialState, allOrders: orders, total: total, totalToday: totalToday };

  expect(wsReducer(initialState, {
    type: WS_GET_ALL_ORDERS_MESSAGE,
    payload: {
      orders: orders,
      total: total,
      totalToday: totalToday
    }
  })).toEqual(resultState);
});

test('should handle successful connection to receive user orders', () => {
  const resultState: IWsReducerState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(initialState, { type: WS_USER_ORDERS_CONNECTION_SUCCESS })).toEqual(resultState);
});

test('should handle receive user orders connection error', () => {
  const previousState: IWsReducerState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_USER_ORDERS_CONNECTION_ERROR })).toEqual(initialState);
});

test('should handle receive user orders connection close', () => {
  const previousState: IWsReducerState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_USER_ORDERS_CONNECTION_CLOSED })).toEqual(initialState);
});

test('should handle to receive user orders message', () => {
  const userOrders: Array<IOrder> = [{} as IOrder, {} as IOrder, {} as IOrder];
  const resultState: IWsReducerState = { ...initialState, userOrders: userOrders };

  expect(wsReducer(initialState, {
    type: WS_GET_USER_ORDERS_MESSAGE,
    payload: { orders: userOrders }
  })).toEqual(resultState);
});