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
 
    // ローカルサーバー設定
    connect: {
      options: {
      },
      livereload: {
        options: {
          base: 'dev/',// rootを設定
          open: true
        }
      }
    },
    compass: {
/*      dist: {
        options: {
        sassDir: 'sass',
        cssDir: 'css',
        environment: 'production'
        }
      },*/
      dev: {
        options: {
          config: 'config.rb'
        }
      }
/*      dev: {                    // Another target
        options: {
          sassDir: 'develop/sass',
          cssDir: 'develop/css'
        }
      }*/
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      }
//      },
//      all: ['develop/js/*.js']
    },
    // 公開用にdistフォルダにコピー
    copy: {
      dist: {
        expand: true,
        cwd: 'dev/',
        dest: 'dist',
        src: '**'
      }
    },
    // 公開フォルダから不要なデータを削除
    clean: {
      build: ['dist/sass']
    },

    concat: {
        options: {
            // 結合したファイルの頭にコメント入れたいとき
            banner: '<%= general.comment %>'
        },
        files: {
            // 出力元
            src: [
                'dev/js/a.js',
                'dev/js/b.js'
            ],
            // 出力先( package.jsonのnameから値を取得している)
            dest: 'dev/js/<%= pkg.name %>.js'
        }
    },


/*
    uglify: {
      my_target: {
        files: {
          expand: true,     // 動的拡張機能を有効
//          beautify: true, 
          preserveComments: 'some', // all で全てのコメントを保持、some で /?! から始めるコメントのみ保持
//          report: 'gzip', // gzipファイル生成
          sourceMap: true, 
          src: './js/*.js', // マッチする実際のパターン
          dest: '../js/',   // 遷移先のパスの先頭部分
          ext: '.min.js',   // 遷移先のファイルパスにつける拡張子
        }
      }
    },
*/


    uglify: {
      options: {
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