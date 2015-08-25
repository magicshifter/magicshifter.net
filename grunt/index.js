import {join} from 'path';

import color from 'sc-color';

import fs from 'fs';

import loadTasks from 'load-grunt-tasks';

export default function(grunt) {
  const bannerText = grunt.file.read('./banner.txt');

  const defaultRoot = grunt.option('deploy')
        ? '/'
        : 'file://' + process.cwd() + '/build/';

  const root = grunt.option( 'root' ) || defaultRoot;
  const root_dir = root;
  const static_dir = root_dir + 'static/';
  const img_dir = static_dir + 'img/';
  const social_dir = img_dir + 'social-icons/';
  const js_dir = static_dir + 'js/';

  const defaultTasks = [
    'colors',
    'stylus',
    'jade',
    'browserify',
    'uglify',
    'transfo',
    'watch',
  ];

  const isDev = !grunt.option('deploy');

  const livereload_script = isDev
                            ? 'http://localhost:35729/livereload.js'
                            : false;

  const jsPaths = {
    dev: {
      ms: 'ms.js',
      magic: 'magic.js',
    },
    prod: {
      ms: 'ms.min.js',
      magic: 'magic.min.js',
    },
  };

  const social_accounts = [
    {
        link: 'http://blog.magicshifter.net/'
      , img: social_dir + 'soup.png'
      , alt: 'soup'
      , title: 'repost Magicshifter on soup'
      , visible: true
    },
    {
        link: 'https://www.flickr.com/photos/wizard23/sets/72157632220498947/detail/'
      , img: social_dir + 'flickr.png'
      , alt: 'MagicShifter picture blog on Flickr'
      , title: 'MagicShifter picture blog on Flickr'
      , visible: true
    },
    {
        link: 'http://www.reddit.com/r/MagicShifter/'
      , img: social_dir + 'reddit.png'
      , alt: 'MagicShifter Forum on Reddit'
      , title: 'MagicShifter Forum on Reddit'
      , visible: true
    },
    {
        link: 'https://github.com/magicshifter'
      , img: social_dir + 'github.png'
      , alt: 'Our Github Organisation'
      , title: 'We <3 the Octocat'
      , visible: true
    },
    {
        link: 'https://twitter.com/magicshifter'
      , img: social_dir + '/twitter.png'
      , alt: 'twitter'
      , title: 'follow Magicshifter on twitter'
      , visible: true
    },
    {
        link: 'https://www.facebook.com/magicshifter/'
      , img: social_dir + 'facebook.png'
      , alt: 'facebook'
      , title: 'like magicshifter on facebook'
      , visible: true
    },
    {
        link: 'https://flattr.com/submit/auto?user_id=wizard23&url=http%3A%2F%2Fmagicshifter.net'
      , img: social_dir + 'flattr.png'
      , alt: 'Flattr this'
      , title: 'Flattr this'
      , visible: true
    },
  ];

  const menu_items = [
    {href: '#video', text: 'video'},
    {href: '#program', text: 'program'},
    {href: '#hardware', text: 'features'},
    {href: '#contact', text: 'contact'},
  ];

  console.log('Grunt starting, server root = ' + root);

  const msSources =  [
    'assets/js/index.js',
  ];

  const magicSources = [
    'assets/js/libs/jquery-1.9.1.min.js',
    'assets/js/libs/FileSaver.js',
    'assets/js/libs/libgif-js/libgif.js',
    'assets/js/magicbitmap.js',
  ];

  const stylusSources = [
    'assets/css/reset.styl',
    'assets/css/variables.styl',
    'assets/css/colorcycle.styl',
    'assets/css/main.styl',
    'assets/css/custom-widths.styl'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      options: {
        define: {
          img_dir
        },
        pretty: true,
      },
      compile: {
        files: {
          // compile and concat into single file
          'build/static/css/main.css': stylusSources,
        },
      },
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false,
            root_dir,
            img_dir,
            static_dir,
            social_accounts,
            menu_items,
            livereload_script,
            js_dir,
            js_files: (isDev ? jsPaths.dev : jsPaths.prod),
          }
        },
        files: {
          'build/index.html': ['assets/jade/index.jade'],
          'build/bitmap.html': ['assets/jade/magicbitmap.jade'],
          'build/font.html': ['assets/jade/magicfont.jade']
        },
      },
    },

    browserify: {
      ms: {
        files: {
          'build/static/js/ms.js': msSources,
        },
        options: {
          transform: ['babelify'],
        },
      },
      magic: {
        files: {
          'build/static/js/magic.js': magicSources,
        },
      },
    },

    uglify: {
      options: {
        sourceMap: true,
        banner: bannerText,
      },
      ms: {
        files: {
          'build/static/js/ms.min.js': ['build/static/js/ms.js'],
        },
      },
      magic: {
        files: {
          'build/static/js/magic.min.js': ['build/static/js/magic.js'],
        },
      },
    },

    transfo: {
      options: {
        lazy: true,
      },
      copy_static: {
        files: [
          //copy static files
          {expand: false, src: ['static/**'], dest: 'build/', filter: 'isFile'},
          {expand: false, src: ['favicon.gif'], dest: 'build/'},
        ],
      },
    },

    watch: {
      options: {
        spawn: false,
        livereload: true,
      },
      grunt: {
        files: [join(process.cwd(), 'grunt', 'index.js')],
        tasks: defaultTasks,
      },
      ms: {
        files: msSources,
        tasks: ['browserify:ms', 'uglify:ms'],
      },
      magic: {
        files: magicSources,
        tasks: ['browserify:magic', 'uglify:magic'],

      },
      jade: {
        files: ['assets/jade/**/*'],
        tasks: ['jade'],
      },
      stylus: {
        files: ['assets/css/**/*'],
        tasks: ['stylus'],
      },
      copy: {
        files: ['static/**', 'favicon.gif'],
        tasks: ['transfo'],
      },

      livereload: {
        // These files are sent to the live reload server after compilation
        files: ['build/**/*'],
      },
    },
    colors: {
      cycle: {},
    },
  });

  function colorCycle(numberOfColors) {

    const startColor = color('#1b5369');

    let colors = [];

    for (var i = 0; i < numberOfColors; i++) {
      let currentHue = i * (360 / numberOfColors);

      let currentColor = startColor.hue(`+${currentHue}`);
      /*
      if (i > 1) {
        currentColor = currentColor.saturation(75);
      } else if (i === 1) {
        currentColor = currentColor.saturation(90);
      }
      */ 
      currentColor = currentColor.saturation(60);
      colors.push(currentColor.hex6());
    }

    return colors;
  }

  grunt.registerMultiTask('colors', 'creates color cycle', function() {
    const numberOfSectionFiles = fs.readdirSync(join(process.cwd(), 'assets', 'jade'));

    // get the huesteps, first 2 sections have no gallery, hence -2
    const numberOfSlices = (numberOfSectionFiles.length * 2) - 2;

    const sliceColors = colorCycle(numberOfSlices);

    let styleString = `body\n  article\n`;

    sliceColors.forEach((col, key) => {
      styleString += `    section:nth-child(${key + 1})\n`;
      styleString += `      background-color ${col}\n`;
    });

    fs.writeFileSync(join(process.cwd(), 'assets', 'css', 'colorcycle.styl'), styleString);
  });

  loadTasks(grunt);

  // Load the plugin that provides the 'browserify' task,
  // missing -contrib- in the name :|
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-transfo');

  // Default tasks.
  grunt.registerTask('default', defaultTasks);

};
