module.exports = function(grunt) {
	var defaultRoot = grunt.option('deploy') ? "/" : 'file://' + process.cwd() + '/build/'
	  , rootPathUrl = grunt.option( "rootPathUrl" ) || defaultRoot
	  , root = rootPathUrl
	  , static_folder = root + 'static/'
	  , img_folder = static_folder + 'img/';

	console.log("Grunt starting, server root = " + rootPathUrl);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			options: {
				define: {
					img_folder: img_folder
				}
			},
			compile: {
				files: {
					// compile and concat into single file
					'build/css/main.css': [
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
						debug: false,
						root: root,
						img_folder: img_folder,
						static_folder: static_folder
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
				dest: 'build/js/ga.js',
			},
			extras: {
				src: [
					'assets/js/libs/jquery-1.9.1.min.js',
					'assets/js/libs/FileSaver.js',
					'assets/js/libs/libgif-js/libgif.js',
					'assets/js/magicbitmap.js'
				],
				dest: 'build/js/magic.js',
			},
		},
		copy: {
			main: {
				files: [
					//copy static files
					{expand: false, src: ['static/**'], dest: 'build/'}
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

