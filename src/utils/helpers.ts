import {INGREDIENT_TYPE} from "../definitions/enums/IngredientType";

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