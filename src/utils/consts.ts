const rootUrl = 'https://norma.nomoreparties.space/api/';
const rootAuthUrl = `${rootUrl}auth/`;
export const wsAllOrdersUrl: string = 'wss://norma.nomoreparties.space/orders/all';
export const wsUserOrdersUrl: string = 'wss://norma.nomoreparties.space/orders';

export const URLS = {
  INGREDIENTS: `${rootUrl}ingredients`,
  ORDERS: `${rootUrl}orders`,
  PASSWORD_RESET: `${rootUrl}password-reset`,
  PASSWORD_RESET_RESET: `${rootUrl}password-reset/reset`,
  AUTH: {
    REGISTER: `${rootAuthUrl}register`,
    LOGIN: `${rootAuthUrl}login`,
    USER: `${rootAuthUrl}user`,
    TOKEN: `${rootAuthUrl}token`,
    LOGOUT: `${rootAuthUrl}logout`,
  }
};