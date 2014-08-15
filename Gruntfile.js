module.exports = function (grunt) {
    'use strict';
  // Project configuration.
    grunt.initConfig({
        pkg      : grunt.file.readJSON('package.json'),

        language: grunt.option('lang') || 'en',

        html2js: {
            dist: {
                options: {
                    module: null, // no bundle module for all the html2js templates
                    base: '.'
                },
                files: [{
                    expand: true,
                    src: ['template/*.html'],
                    ext: '.html.js'
                }]
            }
        },

        less: {

            development: {
                options: {
                    paths: ["./src"],
                    //strictMath: true
                    interrupt: true
                },
                tasks: ['less:development'],
                files: {
                    "./src/nestedCombobox.css": "./src/nestedCombobox.less"
                }
            }

        },

        watch: {
            less: {
                files: ['./src/*'],
                tasks: ['less:development'],
                options: {
                    interrupt: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');

  // register css task to have option to separate styles compilation and build
    grunt.registerTask('before-test', ['html2js']);
    grunt.registerTask('watch', ['before-test', 'watch']);
};
