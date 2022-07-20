import {
    URLS,
    TOKEN
} from './consts';

import {cookies} from "./helpers";


const request = (url, method, body, requestHeaders) => {
    const defaultHeaders = {
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
                    requestHeaders.authorization = response[TOKEN.ACCESS];
                    return request(url, method, body, requestHeaders);
                })
                .catch((err) => console.log(err));
        }

        return Promise.reject(error);
    });
};

export const getIngredientsRequest = () => {
    return request(URLS.INGREDIENTS);
};

export const makeOrderRequest = (ingredients) => {
    const ids = ingredients.map((ingredient) => ingredient._id);
    const body = JSON.stringify({ ingredients: ids });
    return request(URLS.ORDERS, "POST", body);
};

/*
    Authorization API
*/

export const loginRequest = (email, password) => {
    const body = JSON.stringify({ email, password });
    return request(URLS.AUTH.LOGIN, "POST", body);
};

export const logoutRequest = () => {
    const body = JSON.stringify({ token: cookies.get(TOKEN.REFRESH) });
    return request(URLS.AUTH.LOGOUT, "POST", body);
};

export const registerRequest = (email, password, name) => {
    const body = JSON.stringify({ email, password, name });
    return request(URLS.AUTH.REGISTER, "POST", body);
};

export const getUserRequest = () => {
    const headers = { authorization: cookies.get(TOKEN.ACCESS) };
    return request(URLS.AUTH.USER, "GET", null, headers);
};

export const updateUserRequest = (name, email, password) => {
    const headers = { authorization: cookies.get(TOKEN.ACCESS) };
    const body = JSON.stringify({ name, email, password });
    return request(URLS.AUTH.USER,"PATCH", body, headers);
};

export const refreshTokenRequest = () => {
    const body = JSON.stringify({ token: cookies.get(TOKEN.REFRESH) });
    return request(URLS.AUTH.TOKEN, "POST", body);
};

export const askToResetPasswordRequest = (email) => {
    const body = JSON.stringify({ email });
    return request(URLS.PASSWORD_RESET, "POST", body);
};

export const resetPasswordRequest = (password, token) => {
    const body = JSON.stringify({ password, token });
    return request(URLS.PASSWORD_RESET_RESET, "POST", body);
};