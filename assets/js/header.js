var header = document.querySelector('header.main');

window.addEventListener('scroll', function(e) {
  resizeHeader();
});

resizeHeader();

setTimeout(() => {
  document.body.classList.add('js');
}, 100);

var menuToggle = header.querySelector('.menu-toggle');
var nav = header.querySelector('nav.main');

menuToggle.addEventListener('click', menuToggleClickHandler);

function menuToggleClickHandler(e) {
  nav.classList.toggle('show');

  if (e.currentTarget.className.indexOf('menu-toggle') > -1) {
    document.body.addEventListener('click', menuToggleClickHandler);
  } else {
    menuToggle.addEventListener('click', menuToggleClickHandler);
  }

  e.currentTarget.removeEventListener('click', menuToggleClickHandler);

  e.stopPropagation();
  return false;
}

function resizeHeader(cb) {
  if (scrollY > 40 ) {
    if (header.className.indexOf('small') < 0) {
      header.classList.add('small');
    }
  } else if (header.className.indexOf('small') > -1) {
    header.classList.remove('small');
  }
}
