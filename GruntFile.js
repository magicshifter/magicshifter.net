module.exports = function(grunt) {
	var defaultRoot = grunt.option('deploy') ? '/' : 'file://' + process.cwd() + '/build/'
	  , rootPathUrl = grunt.option( 'rootPathUrl' ) || defaultRoot
	  , root = rootPathUrl
	  , static_dir = root + 'static/'
	  , img_dir = static_dir + 'img/'
	  , social_dir = img_dir + 'social_icons/'
	  , social_accounts = [
			{
				link: 'http://magicshifter.soup.io/'
			  , img: social_dir + 'soup.png'
			  , alt: 'soup'
			  , title: 'repost Magicshifter on soup'
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
			  , visible: false
			},
			{
				script: '(function(i){var f,s=document.getElementById(i);f=document.createElement("iframe");f.src="//api.flattr.com/button/view/?uid=wizard23&url="+encodeURIComponent(document.URL);f.title="Flattr";f.height=62;f.width=55;f.style.borderWidth=0;s.parentNode.insertBefore(f,s);})("fbjnmyd");'
			  , visible: true
			}
	  ];

	console.log('Grunt starting, server root = ' + rootPathUrl);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			options: {
				define: {
					img_dir: img_dir
				}
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
					data: {
						debug: false
					  ,	root: root
					  ,	img_dir: img_dir
					  ,	static_dir: static_dir
					  , social_accounts: social_accounts
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
				src: ['assets/js/ga.js'],
				dest: 'build/static/js/ga.js',
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
					{expand: false, src: ['favicon.ico'], dest: 'build/'}
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

