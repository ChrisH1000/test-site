module.exports = function(grunt) {
	grunt.initConfig({
 		sass: {
		  compile: {
		    options: {
		      compress: false
		    },
		    files: {
		      'production/css/style.css': 'sass/test.scss',
		      'production/css/bootstrap.css': 'bower_components/sass-bootstrap/lib/bootstrap.scss'
		    }
		  }
		},
		autoprefixer: {
		  compile: {
		    files: {
		      'production/css/style.css': 'production/css/style.css'
		    },
		  },
		},
		cssmin: {
		  clean: {
		    files: {
		      'production/css/style.css': 'production/css/style.css',
		      'production/css/bootstrap.css': 'production/css/bootstrap.css'
		    }
		  }
		},
		pug: {
		  compile: {
		    options: {
		      pretty: true
		    },
		    files: [{
		      expand: true,		      
		      cwd: "pug",
		      src: "*.pug",
		      dest: "production",
		      ext: ".html"
		    }]
		  }
		},
		uglify: {
		  bower_js_files: {
		    files: {
		      'production/js/output.min.js': [
		        'bower_components/jquery/dist/jquery.js',
		        'bower_components/sass-bootstrap/dist/js/bootstrap.js',
		        'bower_components/jquery-ui/jquery-ui.js'
		      ]
		    }
		  }
		},
		watch: {
		  sass: {
		    files: [ 'sass/*.scss' ],
		    tasks: ['sass', 'autoprefixer', 'cssmin']
		  },
		  pug: {
		    files: [ 'pug/*.pug' ],
		    tasks: ['pug']
		  }
		},
		/*express: {
		  all: {
		    options: {
		      bases: 'production',
		      livereload: true,
		      open: 'http://localhost:3000'
		    }
		  }
		},*/
		browserSync: {
		  bsFiles: {
		    src : ['production/css/*.css', 'production/*.html']
		  },
		  options: {
		    watchTask: true,
		    server: {
		      baseDir: "production"
		    }
		  }
		},
	});

	// Load grunt plugins.
 	grunt.loadNpmTasks('grunt-contrib-sass');
 	grunt.loadNpmTasks('grunt-autoprefixer');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');
 	grunt.loadNpmTasks('grunt-contrib-pug');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-watch');
 	//grunt.loadNpmTasks('grunt-express');
 	grunt.loadNpmTasks('grunt-browser-sync');

 	grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'pug', 'uglify']);
 	//grunt.registerTask('start', ['express', 'watch']);
 	grunt.registerTask('start', ['browserSync', 'watch']);
};