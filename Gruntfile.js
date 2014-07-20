module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      js: {
        expand: true,
        src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/tinycolor/tinycolor.js'],
        dest: 'docs/js',
        flatten: true
      },
      css: {
        expand: true,
        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        dest: 'docs/css',
        flatten: true
      },
      bootstrapLESS: {
        cwd: 'bower_components/bootstrap/less/',
        src: ['**'],
        dest: 'build/less',
        expand: true,
        flatten: false
      },
      srcLESS: {
        src: 'src/less/*less',
        dest: 'build/less',
        expand: true,
        flatten: true
      }
    },
    uglify: {
      options: {
        banner: '/*! Pick-a-Color v<%= pkg.version %> | Copyright 2013 Lauren Sperber and Broadstreet Ads https://github.com/lauren/pick-a-color/blob/master/LICENSE | <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      production: {
        files: {
          'build/js/<%= pkg.name %>.min.js': ['src/js/<%= pkg.name %>.js']
        }
      }
    },
    less: {
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          "build/css/<%= pkg.name %>.min.css": "build/less/<%= pkg.name %>.less"
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js', 'Gruntfile.js'],
        tasks: ['jshint', 'uglify']
      },
      less: {
        files: ['src/less/*.less', 'src/less/bootstrap-src/*.less'],
        tasks: ['less']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/*/*.js'],
      options: {
        laxbreak: true,
        force: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['bower-install-simple', 'copy', 'jshint', 'less', 'uglify']);

};
