const body = document.body;
const header = document.querySelector('header.main');
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');

menuToggle.addEventListener('click', menuToggleClickHandler);

function menuToggleClickHandler(e) {
  nav.classList.toggle('show');

  if (e.currentTarget.className.indexOf('menu-toggle') > -1) {
    body.addEventListener('click', menuToggleClickHandler);
  } else {
    menuToggle.addEventListener('click', menuToggleClickHandler);
  }

  e.currentTarget.removeEventListener('click', menuToggleClickHandler);

  e.stopPropagation();
  e.preventDefault();
  return false;
}
