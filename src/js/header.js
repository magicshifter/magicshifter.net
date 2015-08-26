const body = document.body;
const header = document.querySelector('header.main');
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');

setTimeout(() => body.classList.add('js'), 1);


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


function resizeHeader() {
  const scrolledClass = 'scrolled';

  if (window.scrollY > 40) {
    if (body.className.indexOf(scrolledClass) < 0) {
      body.classList.add(scrolledClass);
    }
  } else {
    if (body.className.indexOf(scrolledClass) > -1) {
      body.classList.remove(scrolledClass);
   }
 }
}
