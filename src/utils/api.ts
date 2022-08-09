import {
    URLS
} from './consts';

import {cookies} from "./helpers";
import {IIngredientsResponse} from "../definitions/api/IIngredientsResponse";
import {IAuthResponse} from "../definitions/api/IAuthResponse";
import {TOKEN} from "../definitions/enums/Token";
import {IIngredient} from "../definitions/models/IIngredient";
import {IOrderResponse} from "../definitions/api/IOrderResponse";
import {IUserResponse} from "../definitions/api/IUserResponse";
import {IResponse} from "../definitions/api/IResponse";


const request = <TResponse>(url: string, method?: string | null, body?: string | null, requestHeaders?: Record<string, string>): Promise<TResponse> => {
    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json"
    };

    const headers = requestHeaders
        ? { ...defaultHeaders, ...requestHeaders }
        : defaultHeaders;

    return fetch(url, {
        method: method ? method : (body ? 'POST' : 'GET'),
        body,
        headers,
    }).then( (response) => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(response);
    }).catch(error => {
        if (error.message === "jwt expired") {
            return refreshTokenRequest()
                .then((response) => {
                    cookies.set(TOKEN.ACCESS, response[TOKEN.ACCESS]);
                    cookies.set(TOKEN.REFRESH, response[TOKEN.REFRESH]);
                    if (requestHeaders) {
                        requestHeaders.authorization = response[TOKEN.ACCESS];
                    } else {
                        requestHeaders = {
                            authorization: response[TOKEN.ACCESS]
                        };
                    }

                    return request(url, method, body, requestHeaders);
                })
                .catch((err) => console.log(err));
        }

        return Promise.reject(error);
    });
};

export const getIngredientsRequest = (): Promise<IIngredientsResponse> => {
    return request(URLS.INGREDIENTS);
};

export const makeOrderRequest = (ingredients: IIngredient[]): Promise<IResponse & IOrderResponse> => {
    const ids = ingredients.map((ingredient) => ingredient._id);
    const body = JSON.stringify({ ingredients: ids });
    return request(URLS.ORDERS, "POST", body);
};

/*
    Authorization API
*/

export const loginRequest = (email: string, password: string): Promise<IUserResponse> => {
    const body = JSON.stringify({ email, password });
    return request(URLS.AUTH.LOGIN, "POST", body);
};

export const logoutRequest = (): Promise<IResponse> => {
    const body = JSON.stringify({ token: cookies.get(TOKEN.REFRESH) });
    return request(URLS.AUTH.LOGOUT, "POST", body);
};

export const registerRequest = (email: string, password: string, name: string): Promise<IUserResponse & IAuthResponse> => {
    const body = JSON.stringify({ email, password, name });
    return request(URLS.AUTH.REGISTER, "POST", body);
};

export const getUserRequest = (): Promise<IUserResponse> => {
    const headers = { authorization: cookies.get(TOKEN.ACCESS) };
    return request(URLS.AUTH.USER, "GET", null, headers);
};

export const updateUserRequest = (name: string, email: string, password: string): Promise<IResponse> => {
    const headers = { authorization: cookies.get(TOKEN.ACCESS) };
    const body = JSON.stringify({ name, email, password });
    return request(URLS.AUTH.USER,"PATCH", body, headers);
};

export const refreshTokenRequest = (): Promise<IAuthResponse> => {
    const body = JSON.stringify({ token: cookies.get(TOKEN.REFRESH) });
    return request(URLS.AUTH.TOKEN, "POST", body);
};

export const askToResetPasswordRequest = (email: string): Promise<IResponse> => {
    const body = JSON.stringify({ email });
    return request(URLS.PASSWORD_RESET, "POST", body);
};

export const resetPasswordRequest = (password: string, token: string): Promise<IResponse>  => {
    const body = JSON.stringify({ password, token });
    return request(URLS.PASSWORD_RESET_RESET, "POST", body);
};