'use strict';

module.exports = function(grunt){

	// Requires
	require('time-grunt')(grunt); // How long tasks take
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	// Grunt task configurations
	// -------------------------
	grunt.initConfig({

		// --- JSHint ---
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'app/scripts/{,*/}*.js'
				]
			}
		},

		// --- Copy ---
		copy: {
			dist: {
				cwd: 'app',
				src: ['**', '!styles/**/*.css', '!scripts/**/*.js'],
				dest: 'dist',
				expand: true
			},
			fonts: {
				files: [
					{
						// For bootstrap fonts
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap/dist',
						src: ['fonts/*.*'],
						dest: 'dist'
					},
					{
						// For font-awesome
						expand: true,
						dot: true,
						cwd: 'bower_components/font-awesome',
						src: ['fonts/*.*'],
						dest: 'dist'
					}
				]
			}
		},

		// --- Clean ---
		clean: {
			build: {
				src: ['dist/']
			}
		},

		// --- Concat ---
		concat: {
			options: {
				separator: ';'
			},
			// Dist configuration provided by useminPrepare
			dist: {}
		},

		// --- Cssmin ---
		cssmin: {
			// Dist configuration provided by useminPrepare
			dist: {}
		},

		// --- Uglify ---
		uglify: {
			// Dist configuration provided by useminPrepare
			dist: {}
		},

		// --- Filerev ---
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			// Filerev:release hashes(md5) all assets (images, js and css)
			release: {
				// In dist directory
				files: [{
					src: [
						'dist/scripts/*.js',
						'dist/styles/*.css',
					]
				}]
			}
		},

		// --- UseminPrepare ---
		useminPrepare: {
			html: 'app/####.html', // HTML file(s)
			options: {
				dest: 'dist'
			}
		},

		// --- Usemin ---
		usemin: {
			html: ['dist/*.html'],
			css: ['dist/styles/*.css'],
			options: {
				assetDirs: ['dist', 'dist/styles']
			}
		},

		// --- Watch ---
		watch: {
			copy: {
				files: ['app/**', '!app/**/*.css', '!app/**/*.js'],
				tasks: ['build']
			},
			scripts: {
				files: ['app/scripts/####.js'], // JS file(s)
				tasks: ['build']
			},
			styles: {
				files: ['app/styles/####.css'], // CSS file(s)
				tasks: ['build']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'app/{,*/}*.html',
					// LESS / SASS preprocessors pipe the output to the .tmp folder
					'.tmp/styles/{,*/}*.css',
					'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// --- Connect ---
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost',
				livereload: 35729
			},
			dist: {
				options: {
					open: true,
					base: {
						path: 'dist',
						options: { 
							index: '####.html', // HTML index
							maxAge: 300000
						}
					}
				}
			}
		}
	});

	// Register tasks
	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);

	grunt.registerTask('default', ['build']);
};
