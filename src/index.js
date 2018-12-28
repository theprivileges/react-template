'use strict';

import './styles/index.css';

const resetLinks = (element, text) => element.innerText = text;

const textCallback = (element, text) => {
    window.setTimeout(resetLinks, 2000, element, text);
    return 'Loading...';
};

const clickCallback = (event) => {
    const target = event.target;
    return textCallback(target, target.innerText);
}

const clickButton = (element) => element.addEventListener('click', clickCallback);

const buttons = document.querySelectorAll('a.button');

[...buttons].forEach(clickButton);