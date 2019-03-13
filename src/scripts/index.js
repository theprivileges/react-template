import 'babel-polyfill';

import '../styles/index.css';
import ready from './ready';
import resetLinks from './resetLinks';


const textCallback = (element, text) => {
  window.setTimeout(resetLinks, 2000, element, text);
  return element.innerText = 'Loading...';
};

const clickCallback = (event) => {
  const target = event.target;
  return textCallback(target, target.innerText);
}

const clickButton = (element) => element.addEventListener('click', clickCallback);

ready(() => {
  const buttons = document.querySelectorAll('a.button');

  [...buttons].forEach(clickButton);
})