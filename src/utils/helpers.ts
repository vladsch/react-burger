import {INGREDIENT_TYPE} from "../definitions/enums/IngredientType";
import {IIngredient} from "../definitions/models/IIngredient";
import {ORDER_STATUS} from "../definitions/enums/OrderStatus";

export const getViewTab = (scroll: Element | null): INGREDIENT_TYPE | null => {
    if (!scroll) {
        throw new Error('scroll element is null');
    }
    const top = scroll.getBoundingClientRect().top ;
    const groups = scroll.querySelectorAll('div.group');
    let viewGroup = groups[0];
    for (let i = 0; i < groups.length; i++) {
        const groupRect = groups[i].getBoundingClientRect();

        if (groupRect.top <= top &&
            groupRect.bottom > top) {
            viewGroup = groups[i];
            break;
        }
    }
    return viewGroup.getAttribute("data-group") as INGREDIENT_TYPE;
};

export const cookies = {
    set: (name: string, value: string): void => {
        document.cookie = `${name}=${value};path=/`;
    },

    get: (name: string): string => {
        let matches = document.cookie.match(new RegExp(
            // eslint-disable-next-line no-useless-escape
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : '';
    },

    delete: (name: string): void => {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
};

export const getDate = (date: string): string => {
    const orderDate = new Date(date);
    let days;
    const now = new Date();
    const nowDay = now.getDate();
    let day = orderDate.getUTCDate();
    let hour = orderDate.getHours();
    let month = orderDate.getMonth();
    const min = orderDate.getMinutes();
    const gmt = orderDate.toString().split("GMT")[1];
    let minStr = min.toString();

    if (min < 10) {
        minStr = "0" + minStr;
    }

    const time = `${hour}:${minStr} i-GMT${gmt.slice(0, 1)}${Number(
        gmt.slice(1, 3)
    )}`;

    if (now.getMonth() - month > 0) {
        return `${day}/${month}, ${time}`;
    }

    if (nowDay - day > 1) {
        days = nowDay - day;
        return days < 5
            ? `${days} дня назад, ${time}`
            : `${days} дней назад, ${time}`;
    }

    if (nowDay - day === 1) {
        return `Вчера, ${time}`;
    }

    return `Сегодня, ${time}`;
};

export function getUniqueOrderIngredients(ingredients: Array<IIngredient>): Map<string, Array<IIngredient>> {
    const uniqueIngredients = new Map<string, Array<IIngredient>>();

    ingredients.forEach(item => {
        const value = uniqueIngredients.has(item._id) ? [...uniqueIngredients.get(item._id) as Array<IIngredient>, item] : [item];
        uniqueIngredients.set(item._id, value);
    });

    return uniqueIngredients;
}

export function getOrderTotalCost(ingredients: Array<IIngredient>): number {
    return ingredients.reduce((total, current) => total + current.price, 0);
}

export function getReadableOrderStatus(status: ORDER_STATUS): string {
    switch (status) {
        case ORDER_STATUS.CREATED: {
            return 'Создан';
        }
        case ORDER_STATUS.PENDING: {
            return 'Готовится';
        }
        case ORDER_STATUS.DONE: {
            return 'Выполнен';
        }
        default: {
            return status;
        }
    }
}