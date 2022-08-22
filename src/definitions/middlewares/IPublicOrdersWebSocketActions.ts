import { IOrdersWebSocketActions } from "./IOrdersWebSocketActions";

export interface IPublicOrdersWebSocketActions extends IOrdersWebSocketActions {
  wsInit: 'WS_ALL_ORDERS_CONNECTION_START';
  onOpen: 'WS_ALL_ORDERS_CONNECTION_SUCCESS';
  onClose: 'WS_ALL_ORDERS_CONNECTION_CLOSED';
  onError: 'WS_ALL_ORDERS_CONNECTION_ERROR';
  onMessage: 'WS_GET_ALL_ORDERS_MESSAGE';
}