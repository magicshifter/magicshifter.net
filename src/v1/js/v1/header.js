(function() {
  'use strict';
  var header = document.querySelector('header.main');

  window.addEventListener('scroll', function(e) {
    resizeHeader();
  });

  function resizeHeader(cb) {
    if (scrollY > 40 ) {
      if (header.className.indexOf('small') < 0) {
        header.classList.add('small');
      }
    } else if (header.className.indexOf('small') > -1) {
      header.classList.remove('small');
    }
  }

  resizeHeader();

  setTimeout(function() {
    document.body.classList.add('js');
  }, 100);

  var menuToggle = header.querySelector('.menu-toggle');
  var nav = header.querySelector('nav.main');

  menuToggle.addEventListener('click', menuToggleClickHandler);

  function menuToggleClickHandler(e) {
    nav.classList.toggle('show');

    document.body.addEventListener('click', menuToggleClickHandler);

    e.target.removeEventListener('click');
    e.stopPropagation();
    return false;
  }

})();
