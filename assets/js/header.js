var header = document.querySelector('header.main');

window.addEventListener('scroll', function(e) {
  resizeHeader();
});

function resizeHeader() {
  if (scrollY < 40 ) {
    if (header.className.indexOf('big') < 0) {
      header.classList.add('big');
    }
  } else if (header.className.indexOf('big') > -1) {
    header.classList.remove('big');
  }
}

resizeHeader();
