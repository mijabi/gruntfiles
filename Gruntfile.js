module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    general: {
      comment: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },

    paths: {
      javascript: [
        'dev/js/a.js',
        'dev/js/b.js'
      ],
      scss: [
        'dev/sass/*.scss'
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

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: 'dev/',
        dest: 'dist',
        src: '**'
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
            src: [
                'dev/js/a.js',
                'dev/js/b.js'
            ],
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
  grunt.registerTask('build', ['css', 'copy', 'clean', 'concat', 'uglify']);

};