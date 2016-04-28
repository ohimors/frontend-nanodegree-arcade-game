module.exports = function (grunt){
	require('load-grunt-tasks')(grunt);
	var config = grunt.file.readYAML('GruntConfig.yml');
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				config.jsSrcDir+'*.js'
			]
		}
	});

	grunt.registerTask('default',[
		'jshint'
	]);
};
