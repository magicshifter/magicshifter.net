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

var env = process.env.NODE_ENV || 'development';

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
  server: server,
  copy: [
    {
      src: join(dirs.src, dirs.assets, '**'),
      out: join(dirs.out),
    },
  ],
  locals: {
    env: env,
    dirs: server.dirs,
  },
};
