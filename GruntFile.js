module.exports = function(grunt) {
  var defaultRoot = grunt.option('deploy') ? '/' : 'file://' + process.cwd() + '/build/'
    , root = grunt.option( 'root' ) || defaultRoot
    , root_dir = root
    , static_dir = root_dir + 'static/'
    , img_dir = static_dir + 'img/'
    , social_dir = img_dir + 'social-icons/'
    , social_accounts = [
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
    ]
    , menu_items = [
      {href: '#video', text: 'video'},
      {href: '#upload', text: 'upload'},
      {href: '#program', text: 'program'},
      {href: '#technical', text: 'features'},
      {href: '#contact', text: 'contact'},
    ];

  console.log('Grunt starting, server root = ' + root);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options: {
        define: {
          img_dir: img_dir
        },
        pretty: true,
      },
      compile: {
        files: {
          // compile and concat into single file
          'build/static/css/main.css': [
            'assets/css/reset.styl',
            'assets/css/main.styl',
            'assets/css/custom-widths.styl'
          ]
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
              debug: false
            , root_dir: root_dir
            , img_dir: img_dir
            , static_dir: static_dir
            , social_accounts: social_accounts
            , menu_items: menu_items
          }
        },
        files: {
          'build/index.html': ['assets/jade/index.jade'],
          'build/bitmap.html': ['assets/jade/magicbitmap.jade'],
          'build/font.html': ['assets/jade/magicfont.jade']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      basic: {
        src: ['assets/js/ga.js', 'assets/js/header.js'],
        dest: 'build/static/js/ms.js',
      },
      extras: {
        src: [
          'assets/js/libs/jquery-1.9.1.min.js',
          'assets/js/libs/FileSaver.js',
          'assets/js/libs/libgif-js/libgif.js',
          'assets/js/magicbitmap.js'
        ],
        dest: 'build/static/js/magic.js',
      },
    },
    copy: {
      main: {
        files: [
          //copy static files
          {expand: false, src: ['static/**'], dest: 'build/'},
          {expand: false, src: ['favicon.gif'], dest: 'build/'}
        ]
      }
    }
  });

  // Load the plugin that provides the 'stylus' task.
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Load the plugin that provides the 'jade' task.
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Load the plugin that provides the 'concat' task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  //used to copy the images and static files to the build directory
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['stylus', 'jade', 'concat', 'copy']);
};

