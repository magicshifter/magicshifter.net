document.body.classList.add('js');

// google analytics
const gaL = 'https://www.google-analytics.com/analytics.js';
(function(i,s,o,g,r,a,m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() { (i[r].q = i[r].q || []).push(arguments); };
  i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document,'script', gaL, 'ga');

ga('create', 'UA-35739153-1', 'magicshifter.net');
ga('send', 'pageview');

const hasClass = (ele, cl) => ele.className.indexOf(cl) > -1;

const body = document.body;
const header = document.querySelector('header.main');

function resizeHeader() {
  const scrolledClass = 'scrolled';

  if (window.scrollY > 40) {
    if (!hasClass(body, scrolledClass)) {
      body.classList.add(scrolledClass);
    }
  } else {
    if (hasClass(body, scrolledClass)) {
      body.classList.remove(scrolledClass);
    }
  }
}

window.addEventListener('scroll', resizeHeader);

resizeHeader();

// menutoggle
const menuToggle = header.querySelector('.menu-toggle');
const nav = header.querySelector('nav.main');
const className = 'show';

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

  body.removeEventListener('click', bodyToggleClickHandler);
}

if (menuToggle && typeof menuToggle.addEventListener === 'function') {
  menuToggle.addEventListener('click', menuToggleClickHandler);
}
