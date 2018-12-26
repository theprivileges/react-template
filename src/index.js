'use strict';

const resetLinks = function (element, text) {
    return element.innerText = text;
};

const textCallback = (element, text) => {
    window.setTimeout(resetLinks, 2000, element, text);
    return 'Loading...';
};

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('a.button');
    // letting the user know he clicked on a button
    button.addEventListener('click', (event) => {
        const target = event.target;
        return textCallback(target, target.innerText)
    });
});