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

var tableHeaders = document.querySelectorAll('th');
var wantedTableHeader = null;
Object.keys(tableHeaders).forEach(function(key) {
  var header = tableHeaders[key];
  if (header.innerHTML === 'Datasheet') {
    wantedTableHeader = header;
  }
});

window.addEventListener('resize', changeTableHeader);

changeTableHeader();

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

function changeTableHeader() {
  if (window.innerWidth < 400) {
    wantedTableHeader.innerHTML = 'PDF';
  } else {
    wantedTableHeader.innerHTML = 'Datasheet';
  }
}
