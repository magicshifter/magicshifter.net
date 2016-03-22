import { hasClass } from './hasClass';

const body = document.body;
const header = document.querySelector('header.main');
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');
const className = 'show';

if (menuToggle && typeof menuToggle.addEventListener === 'function') {
  menuToggle.addEventListener('click', menuToggleClickHandler);
}

const menuToggleClickHandler =
  e => {
    nav.classList.toggle(className);
    body.addEventListener('click', bodyToggleClickHandler);

    e.stopPropagation();
    e.preventDefault();
    return false;
  };

const bodyToggleClickHandler =
  () => {
    if (hasClass(nav, className)) {
      nav.classList.remove(className);
    }

    body.removeEventListener('click');
  };
