import { IOrdersWebSocketActions } from "./IOrdersWebSocketActions";

export interface IPrivateOrdersWebSocketActions extends IOrdersWebSocketActions {
  wsInit: 'WS_USER_ORDERS_CONNECTION_START';
  onOpen: 'WS_USER_ORDERS_CONNECTION_SUCCESS';
  onClose: 'WS_USER_ORDERS_CONNECTION_CLOSED';
  onError: 'WS_USER_ORDERS_CONNECTION_ERROR';
  onMessage: 'WS_GET_USER_ORDERS_MESSAGE';
}