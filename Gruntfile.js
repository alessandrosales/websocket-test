module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      default: {
        options: {
          pretty: true
        }, 
        files: {
          'public/index.html': 'src/jade/index.jade',
          'public/exemplo1.html': 'src/jade/exemplo1.jade',
          'public/exemplo2.html': 'src/jade/exemplo2.jade',
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/style.css': 'src/sass/style.sass'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'public/js/dependencias.min.js': [
            'lib/jquery/dist/jquery.min.js',
            'lib/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'
          ],
          'public/js/main.min.js': ['src/js/main.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          livereload: true,
          base: 'public'
        }
      }
    },
    watch: {
      jade: {
        files: ['src/jade/**/*.jade'],
        tasks: ['jade'] 
      },
      sass: {
        files: ['src/sass/*.sass'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify']
      },
      options: {
        livereload: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['jade','sass','uglify']);
  grunt.registerTask('server', ['default','connect', 'watch']);

};