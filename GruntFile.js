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
		}
	});

	// Load the plugin that provides the "jade" task.
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Default task(s).
	grunt.registerTask('default', ['stylus']);

};

