import { hasClass } from './hasClass';

const body = document.body;
const header = document.querySelector('header.main');

window.addEventListener('scroll', resizeHeader);

const resizeHeader =
  () => {
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
  };

resizeHeader();
