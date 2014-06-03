module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			compile: {
				files: {
					// compile and concat into single file
					'css/main.css': ['css/reset.styl', 'css/main.styl', 'css/custom-widths.styl']
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
					'build/MagicBitmap.html': ['jade/MagicBitmap.jade'],
					'build/MagicFont.html': ['jade/MagicFont.jade']
				}
			}
		}
	});

	// Load the plugin that provides the 'stylus' task.
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Load the plugin that provides the 'jade' task.
	grunt.loadNpmTasks('grunt-contrib-jade');

	// Default task(s).
	grunt.registerTask('default', ['stylus', 'jade']);

};

