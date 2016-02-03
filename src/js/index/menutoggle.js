import {hasClass} from 'utils';

const body = document.body;
const header = document.querySelector('header.main');
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');
const className = 'show';

menuToggle.addEventListener('click', menuToggleClickHandler);

function menuToggleClickHandler(e) {
  nav.classList.toggle(className);
  body.addEventListener('click', bodyToggleClickHandler);

  e.stopPropagation();
  e.preventDefault();
  return false;
}

function bodyToggleClickHandler(e) {
  if (hasClass(nav, className)) {
    nav.classList.remove(className);
  }

  body.removeEventListener('click');
}
