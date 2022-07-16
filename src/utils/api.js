import {
    URLS
} from './consts';


const request = (url, method, body) => {
    return fetch(url, {
        method: method ? method : (body ? 'POST' : 'GET'),
        body: body,
        headers: {
            "Content-Type": "application/json"
        },
    }).then( (response) => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(response);
    }).catch(error => Promise.reject(error));
};

export const getIngredientsRequest = () => {
    return request(URLS.INGREDIENTS);
};

export const makeOrderRequest = (ingredients) => {
    const ids = ingredients.map((ingredient) => ingredient._id);
    const body = JSON.stringify({ ingredients: ids });
    return request(URLS.ORDERS, "POST", body);
};