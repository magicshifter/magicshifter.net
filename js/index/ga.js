const _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35739153-1']);
_gaq.push(['_trackPageview', '/']);

function clickLink(e, isHome = false) {
  const eventName = isHome ? 'home' : e.target.innerHTML;
  _gaq.push('_trackEvent', 'navigation', eventName);
}

const nav = document.querySelector('header.main nav');
const links = nav.querySelectorAll('a');

Object.keys(links).forEach(key => {
  const link = links[key];
  if (typeof link.addEventListener === 'function') {
    link.addEventListener('click', clickLink);
  }
});

const logo = document.querySelector('a#logo');
logo.addEventListener('click', (e) => { clickLink(e, true); });

const ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src =  'https://ssl.google-analytics.com/ga.js';
const s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
