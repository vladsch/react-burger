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