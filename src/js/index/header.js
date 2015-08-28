const body = document.body;
const header = document.querySelector('header.main');

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
