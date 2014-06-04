module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
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
						debug: false
					}
				},
				files: {
					'build/index.html': ['jade/index.jade'],
					'build/MagicBitmap.html': ['jade/magicbitmap.jade'],
					'build/MagicFont.html': ['jade/magicfont.jade']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			files: {
				'build/js/ga.js': ['js/ga.js'],
				'build/js/magic.js': [
					'js/libs/jquery-1.9.1.min.js',
					'js/libs/FileSaver.js',
					'js/libs/libgif-js/libgif.js',
					'js/magicbitmap.js'
				]
			}
		},
		copy: {
		  main: {
			files: [
				//copy images
				{expand: true, src: ['img/**'], dest: 'build'},
				//copy static files
				{expand: true, src: ['static/**'], dest: 'build'}
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

