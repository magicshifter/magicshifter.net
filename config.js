
var join = require('path').join;

var src = 'src';
var build = 'build';
var config = 'config';
var appcache = 'manifest.appcache';

var dirs = {
  cwd: __dirname,
  src: join(__dirname, src),
  out: join(__dirname, build),
  js: 'js',
  css: 'css',
  html: 'html',
  assets: 'assets',
  config: join(__dirname, config),
  img: 'img',
  pages: 'pages',
  gulp: 'gulp',
  favicon: 'favicon.ico',
  v1: 'v1',
};


var socialAccounts = [
  {
      link: 'http://blog.magicshifter.net/'
    , img: '/img/social-icons/soupng'
    , alt: 'soup'
    , title: 'repost Magicshifter on soup'
    , visible: true
  },
  {
      link: 'https://www.flickr.com/photos/wizard23/sets/72157632220498947/detail/'
    , img: '/img/social-icons/flickr.png'
    , alt: 'MagicShifter picture blog on Flickr'
    , title: 'MagicShifter picture blog on Flickr'
    , visible: true
  },
  {
      link: 'http://www.reddit.com/r/MagicShifter/'
    , img: '/img/social-icons/reddit.png'
    , alt: 'MagicShifter Forum on Reddit'
    , title: 'MagicShifter Forum on Reddit'
    , visible: true
  },
  {
      link: 'https://github.com/magicshifter'
    , img: '/img/social-icons/github.png'
    , alt: 'Our Github Organisation'
    , title: 'We <3 the Octocat'
    , visible: true
  },
  {
      link: 'https://twitter.com/magicshifter'
    , img: '/img/social-icons/twitter.png'
    , alt: 'twitter'
    , title: 'follow Magicshifter on twitter'
    , visible: true
  },
  {
      link: 'https://www.facebook.com/magicshifter/'
    , img: '/img/social-icons/facebook.png'
    , alt: 'facebook'
    , title: 'like magicshifter on facebook'
    , visible: true
  },
  {
      link: 'https://flattr.com/submit/auto?user_id=wizard23&url=http%3A%2F%2Fmagicshifter.net'
    , img: '/img/social-icons/flattr.png'
    , alt: 'Flattr this'
    , title: 'Flattr this'
    , visible: true
  },
];

var env = process.env.NODE_ENV || 'development';

var menuItems = [
  {href: '/♥', text: 'about'},
  {href: '/video', text: 'video'},
  {href: '/features', text: 'features'},
  {href: '/program', text: 'program'},
  {href: '/contact', text: 'contact'},
];

var server = {
  // Files to exclude from static serving,
  // relative to out directory
  files: '!(server.js|config.js)',
  dirs: {
    img: '/' + dirs.img + '/',
    js: '/' + dirs.js + '/',
    css: '/' + dirs.css + '/',
    v1: {
      img: '/' + dirs.v1 + '/' + dirs.img + '/',
      js: '/' + dirs.v1 + '/' + dirs.js + '/',
      css: '/' + dirs.v1 + '/' + dirs.css + '/',
    },
  },
};

module.exports = {
  CNAME: 'magicshifter.net',
  port: 1337,
  pages: '/ /index.html',
  pageItems: {
    '/': '/index.html',
    '/v1': '/v1/index.html',
    '/%E2%99%A5': '/index.html',
  },
  menuItems: menuItems,
  env: env,
  dirs: dirs,
  files: {
    css: join(dirs.src, '**', dirs.css, '@(main.styl|*.main.styl)'),
    js: {
      index:  dirs.js,
      v1: join(dirs.v1, dirs.js),
      magic: join(dirs.v1, dirs.js),
    },
    html: [
      {
        src: join(dirs.src, dirs.html, dirs.pages, '*.jade'),
        out: dirs.out,
      },
      {
        src: join(dirs.src, dirs.v1, dirs.html, dirs.pages, '*.jade'),
        out: join(dirs.out, dirs.v1),
      },
    ],
    copy: '!(*.xcf|*.psd|*.ai)',
    server: 'server.js',
    compress: '!(*.ico|*.gz)',
  },
  config: {
    babelrc: 'babelrc',
    jaderc: 'jadelintrc',
    jscsrc: 'jscsrc',
    stylintrc: 'stylintrc',
  },
  watch: {
    src: src,
    appcache: appcache,
    config: config,
    tasks: [
      {
        src: join(dirs.src, dirs.js, '**', '*.js'),
        tasks: ['build:js', 'server'],
      },
      {
        src: join(dirs.src, dirs.v1, dirs.js, '**', '*.js'),
        tasks: ['build:js', 'server'],
      },
      {
        src: join(dirs.src, dirs.css, '**', '*.styl'),
        tasks: ['build:css', 'server'],
      },
      {
        src: join(dirs.src, dirs.v1, dirs.css, '**', '*.styl'),
        tasks: ['build:css', 'server'],
      },
      {
        src: join(dirs.src, dirs.html, '**', '*.jade'),
        tasks: ['build:html', 'server'],
      },
      {
        src: join(dirs.src, dirs.v1, dirs.html, '**', '*.jade'),
        tasks: ['build:html', 'server'],
      },
      {
        src: join(dirs.config, '*'),
        tasks: ['build', 'server'],
      },
      {
        src: 'config.js',
        tasks: ['build', 'server'],
      },
      {
        src: join(dirs.src, dirs.assets, '**', '*'),
        tasks: ['build:copy', 'server'],
      },
      {
        src: join(dirs.src, dirs.v1, dirs.assets, '**', '*'),
        tasks: ['build:copy', 'server'],
      },
      {
        src: join(dirs.src, appcache),
        tasks: ['build:appcache', 'server'],
      }
    ],
  },
  socialAccounts: socialAccounts,
  server: server,
  copy: [
    {
      src: join(dirs.src, dirs.assets, '**'),
      out: join(dirs.out),
    },
    {
      src: join(dirs.src, dirs.v1, dirs.assets, '**'),
      out: join(dirs.out, dirs.v1),
    },
  ],
  locals: {
    env: env,
    socialAccounts: socialAccounts,
    menuItems: menuItems,
    dirs: server.dirs,
  },
};
