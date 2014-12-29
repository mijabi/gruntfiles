module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    general: {
      comment: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },

    paths: {
      javascript: [
        'dev/js/a.js',
        'dev/js/b.js',
        'Gruntfile.js'
      ],
      scss: [
        'dev/sass/**/*.scss'
      ],
      css: [
        'dev/css/main.css',
        'dev/css/sub.css'
      ]
    },
 
    connect: {
      options: {
      },
      livereload: {
        options: {
          base: 'dev/',// set root
          open: true
        }
      }
    },

    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }
      }
    },


    cssmin: {
      minify: {
        expand: true,
        cwd: 'dev/css/',
        src: ['**/*.css', '!**/*.min.css'],
        dest: 'dev/css/',
        ext: '.min.css',
        options: {
          noAdvanced: true,
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      html: {
        expand: true,
        flattn: false,
        cwd: 'dev/',
        src: '**/*.html',
        dest: 'dist/'
      },
      css: {
        expand: true,
        flattn: false,
        cwd: 'dev/',
        src: 'css/**/*.css',
        dest: 'dist/'
      },
      js: {
        expand: true,
        flattn: false,
        cwd: 'dev/',
        src: 'js/**/*.js',
        dest: 'dist/'
      },
      img: {
        expand: true,
        flattn: false,
        cwd: 'dev/',
        src: 'img/*',
        dest: 'dist/'
      }
    },

    clean: {
      build: ['dist/sass']
    },

    concat: {
        options: {
            banner: '<%= general.comment %>' // leave comment
        },
        files: {
            src: ['<%= paths.javascript %>'],
            dest: 'dev/js/<%= pkg.name %>.js'
        }
    },

    uglify: {
      options: {
/*
//          beautify: true, 
          preserveComments: 'some', // all で全てのコメントを保持、some で /?! から始めるコメントのみ保持
//          report: 'gzip', // gzipファイル生成
          sourceMap: true, 
*/
        banner: '<%= general.comment %>',
        mangle: true
      },
      dist: {
        files: {
          'dev/js/<%= pkg.name %>.min.js': ['<%= paths.javascript %>']
        }
      }
    },


    // ファイル監視
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['<%= paths.css %>'],
        tasks: ['cssmin']
      },
      js: {
        files: ['<%= paths.javascript %>'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      compass: {
        files: ['<%= paths.scss %>'],
        tasks: ['compass']
      },
      livereload: {
        files: ['dev/index.html']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
 
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('develop', ['connect', 'watch']);
  grunt.registerTask('css', ['compass']);
  grunt.registerTask('build', ['css', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('release', ['css', 'copy', 'clean', 'concat', 'uglify']);

};