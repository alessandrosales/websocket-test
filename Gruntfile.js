module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/style.css': 'src/sass/style.sass'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'assets/js/dependencias.min.js': [
            'lib/jquery/dist/jquery.min.js',
            'lib/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'
          ],
          'assets/js/main.min.js': ['src/js/main.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          livereload: true
        }
      }
    },
    watch: {
      sass: {
        files: ['src/sass/**.sass'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**.js', 'Gruntfile.js'],
        tasks: ['uglify']
      },
      jade: {
        files: ['views/**/*.jade']
      },
      node: {
        files: ['app.js']
      },
      options: {
        livereload: true
      }
    }
  });
  
  // Default task(s).
  grunt.registerTask('default', ['sass','uglify']);
  grunt.registerTask('server', ['default','connect', 'watch']);
  grunt.registerTask('dev', ['watch']);

};