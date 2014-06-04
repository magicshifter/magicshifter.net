module.exports = function(grunt) {

	var rootPathUrl = grunt.option( "rootPathUrl" ) || 'file://' + process.cwd() + '/build/'
	  , root = rootPathUrl
	  , img_folder = root + 'img/'
	  , static_folder = root + 'static/';

	console.log("Grunt starting, server root = " + rootPathUrl);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			define: {
				'header_bg': img_folder + 'magicshifter.jpg'
			},
			compile: {
				files: {
					// compile and concat into single file
					'build/css/main.css': ['css/reset.styl', 'css/main.styl', 'css/custom-widths.styl']
				}
			}
		},
		jade: {
			compile: {
				options: {
					data: {
						debug: false,
						root: root,
						img_folder: img_folder,
						static_folder: static_folder
					}
				},
				files: {
					'build/index.html': ['jade/index.jade'],
					'build/bitmap.html': ['jade/magicbitmap.jade'],
					'build/font.html': ['jade/magicfont.jade']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			basic: {
				src: ['js/ga.js'],
				dest: 'build/js/ga.js',
			},
			extras: {
				src: [
					'js/libs/jquery-1.9.1.min.js',
					'js/libs/FileSaver.js',
					'js/libs/libgif-js/libgif.js',
					'js/magicbitmap.js'
				],
				dest: 'build/js/magic.js',
			},
		},
		copy: {
			main: {
				files: [
					//copy images
					{expand: true, src: ['img/**'], dest: 'build'},
					//copy static files
					{expand: true, src: ['static/**'], dest: 'build'},
					{expand: false, src: ['favicon.ico'], dest: 'build/favicon.ico'}
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

