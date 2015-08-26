const body = document.body;
const header = document.querySelector('header.main');
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');

setTimeout(() => body.classList.add('js'), 100);


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

const menuItems = nav.querySelectorAll('a');
const topOffsets = {};

Object.keys(menuItems).forEach((key) => {
  const item = menuItems[key];
  addMenuItemListener(item);
});

function addMenuItemListener(item) {
  if (typeof item.addEventListener === 'function') {
    if (item.href.indexOf('#') > -1) {
      const selector = item.href.split('#')[1];
      topOffsets[selector] = document.querySelector(`#${selector}`).offsetTop;
      item.addEventListener('click', menuItemClickHandler);
    }
  }
}

function menuItemClickHandler(e) {
  const href = e.target.href;
  const selector = href.split('#')[1];
  const topOffset = topOffsets[selector];
  window.scrollTo(0, topOffset);
  window.location = href;
}

window.addEventListener('scroll', resizeHeader);

resizeHeader();

const scrolledClass = 'scrolled';

function resizeHeader(cb) {
  if (scrollY > 40) {
    body.classList.toggle(scrolledClass);
  }
}
