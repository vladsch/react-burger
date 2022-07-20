export const getViewTab = (scroll) => {
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
    return viewGroup.getAttribute("group");
};

export const cookies = {
    set: (name, value) => {
        document.cookie = `${name}=${value};path=/`;
    },

    get: (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    delete: (name) => {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
};