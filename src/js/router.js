import page from 'page';

page('*', show);
page('*', show404);
page();

function isNumber(val) {
  return typeof val === 'number' && (parseInt(val) === parseInt(val));
}

function show(ctx, next) {
  const header = document.querySelector('header.main');
  console.log(ctx);

  let selector = (ctx.pathname === '/')
                 ? ctx.pathname = '#♥'
                 : ctx.pathname.replace('/', '#');

  const target = document.querySelector(selector);
  let {offsetTop} = target;

  if (isNumber(offsetTop)) {
    if (header.clientHeight === 90) {
      offsetTop -= 40;
    }
    console.log('scroll to', offsetTop);
    window.scrollTo(0, offsetTop);
  } else {
    next();
  }

}

function show404(ctx, next) {
  console.log('404');
}
