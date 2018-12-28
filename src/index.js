'use strict';

import './styles/index.css';

const resetLinks = (element, text) => {
    return element.innerText = text;
};

const textCallback = (element, text) => {
    window.setTimeout(resetLinks, 2000, element, text);
    return 'Loading...';
};

const button = document.querySelector('a.button');

button.addEventListener('click', (event) => {
    const target = event.target;
    return textCallback(target, target.innerText);
});