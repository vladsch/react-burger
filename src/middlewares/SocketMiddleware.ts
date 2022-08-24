import { RootState } from "../services/reducers/reducers";
import { Middleware } from "redux";
import { IPrivateOrdersWebSocketActions } from "../definitions/middlewares/IPrivateOrdersWebSocketActions";
import { IPublicOrdersWebSocketActions } from "../definitions/middlewares/IPublicOrdersWebSocketActions";
import { cookies } from "../utils/helpers";
import { TOKEN } from "../definitions/enums/Token";

const createSocketMiddleware = (wsUrl: string, wsActions: IPrivateOrdersWebSocketActions | IPublicOrdersWebSocketActions, withToken: boolean = false): Middleware<{}, RootState> => {
  const socketMiddleware: Middleware<{}, RootState> = (store) => {
      let socket: WebSocket | null = null;

      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

        if (type === wsInit) {
          const token = cookies.get(TOKEN.ACCESS).split("Bearer ")[1];
          const url: string = withToken ? `${wsUrl}?token=${token}` : wsUrl;
          socket = new WebSocket(url);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...payload } = parsedData;

            dispatch({ type: onMessage, payload });
          };

          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }

        next(action);
      };
    };

  return socketMiddleware;
};

export default createSocketMiddleware;
