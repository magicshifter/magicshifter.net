'use strict';

var join = require('path').join;

var src = 'src';
var out = 'dist';
var config = 'config';
var appcache = 'manifest.appcache';

var dirs = {
  cwd: __dirname,
  src: join(__dirname, src),
  out: join(__dirname, out),
  js: 'js',
  css: 'css',
  html: 'html',
  assets: 'assets',
  config: __dirname,
  img: 'img',
  pages: 'pages',
  gulp: 'gulp',
  favicon: 'favicon.ico',
};

var socialAccounts = [
  {
    href: 'http://blog.magicshifter.net/',
    src: '/img/social-icons/soup.png',
    alt: 'soup',
    title: 'repost Magicshifter on soup',
    visible: true,
  },
  {
    href: 'https://www.flickr.com/photos/wizard23/sets/72157632220498947/detail/',
    src: '/img/social-icons/flickr.png',
    alt: 'MagicShifter picture blog on Flickr',
    title: 'MagicShifter picture blog on Flickr',
    visible: true,
  },
  {
    href: 'http://www.reddit.com/r/MagicShifter/',
    src: '/img/social-icons/reddit.png',
    alt: 'MagicShifter Forum on Reddit',
    title: 'MagicShifter Forum on Reddit',
    visible: true,
  },
  {
    href: 'https://github.com/magicshifter',
    src: '/img/social-icons/github.png',
    alt: 'Our Github Organisation',
    title: 'We <3 the Octocat',
    visible: true,
  },
  {
    href: 'https://twitter.com/magicshifter',
    src: '/img/social-icons/twitter.png',
    alt: 'twitter',
    title: 'follow Magicshifter on twitter',
    visible: true,
  },
  {
    href: 'https://www.facebook.com/magicshifter/',
    src: '/img/social-icons/facebook.png',
    alt: 'facebook',
    title: 'like magicshifter on facebook',
    visible: true,
  },
  {
    href: 'https://flattr.com/submit/auto?user_id=wizard23&url=http%3A%2F%2Fmagicshifter.net',
    src: '/img/social-icons/flattr.png',
    alt: 'Flattr this',
    title: 'Flattr this',
    visible: true,
  },
];

var env = process.env.NODE_ENV || 'development';

var menuItems = [
  {href: '#♥', text: 'about'},
  {href: '#video', text: 'video'},
  {href: '#features', text: 'features'},
  {href: '#program', text: 'program'},
  {href: '#contact', text: 'contact'},
];

var server = {
  // Files to exclude from static serving,
  // relative to out directory
  files: '!(server.js|config.js)',
  dirs: {
    img: '/' + dirs.img + '/',
    js: '/' + dirs.js + '/',
    css: '/' + dirs.css + '/',
  },
};

module.exports = {
  CNAME: 'magicshifter.net',
  port: 1337,
  pages: '/ /index.html',
  pageItems: {
    '/': '/index.html',
    '/%E2%99%A5': '/index.html',
  },
  menuItems: menuItems,
  env: env,
  dirs: dirs,
  files: {
    css: join(dirs.src, '**', dirs.css, '@(main.styl|*.main.styl)'),
    js: {
      index:  dirs.js,
    },
    html: [
      {
        src: join(dirs.src, dirs.html, dirs.pages, '*.jade'),
        out: dirs.out,
      },
      {
        src: join(dirs.src, dirs.html, dirs.pages, 'ms3000', 'update', '*.jade'),
        out: join(dirs.out, 'ms3000', 'update'),
      },
    ],
    copy: '!(*.xcf|*.psd|*.ai)',
    server: 'server.js',
    compress: '!(*.ico|*.gz)',
  },
  config: {
    babelrc: '.babelrc',
    jaderc: '.jadelintrc',
    jscsrc: '.jscsrc',
    stylintrc: '.stylintrc',
  },
  watch: {
    src: src,
    appcache: appcache,
    config: config,
    tasks: [
      {
        src: join(dirs.src, dirs.js, '**', '*.js'),
        tasks: ['build:js'],
      },
      {
        src: join(dirs.src, dirs.css, '**', '*.styl'),
        tasks: ['build:css'],
      },
      {
        src: join(dirs.src, dirs.html, '**', '*.jade'),
        tasks: ['build:html'],
      },
      {
        src: join(dirs.config, '*'),
        tasks: ['build'],
      },
      {
        src: 'config.js',
        tasks: ['build'],
      },
      {
        src: join(dirs.src, dirs.assets, '**', '*'),
        tasks: ['build:copy'],
      },
      {
        src: join(dirs.src, appcache),
        tasks: ['build:appcache'],
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
  ],
  locals: {
    env: env,
    socialAccounts: socialAccounts,
    menuItems: menuItems,
    dirs: server.dirs,
  },
};
