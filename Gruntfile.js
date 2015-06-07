module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        files: {
          "html/css/all.css": "less/all.less",
          "html/css/mq.css" : "less/small-screen.less"
        },
        options: {
          compress: false,
          sourceMap: false
        }
      }
    },
    processhtml: {
      build: {
        files: {
          "html/processed/basic.html": "html/preprocess/basic.html",
          "html/processed/newsletter.html": "html/preprocess/newsletter.html"
        }
      }
    },
    emailBuilder: {
      test :{
        files : [{
          expand: true,
          src: ['html/processed/*.html'],
          dest: 'builds/',
        }],
        options: {
          encodeSpecialChars: true
        }
      }
    },
    watch: {
      styles: {
        files: ['less/*.less', 'less/*/*.less', 'less/*/*/*.less'],
        tasks: ['less', 'processhtml']
      },
      templates: {
        files: ['html/preprocess/*.html', 'html/preprocess/includes/*.html'],
        tasks: ['processhtml']
      },
      build: {
        files: ['html/processed/*.html'],
        tasks: ['emailBuilder']
      }
    },
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-run-grunt');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-email-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'processhtml', 'emailBuilder', 'watch' ]);

};