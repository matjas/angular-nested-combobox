module.exports = function (grunt) {
    'use strict';
  // Project configuration.
    grunt.initConfig({
        pkg      : grunt.file.readJSON('bower.json'),

        language: grunt.option('lang') || 'en',

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
        },
        css: {
            compile: ['less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

  // register css task to have option to separate styles compilation and build
    grunt.registerMultiTask('css', function () {
        grunt.task.run(this.data);
    });
    grunt.registerTask('build-css', ['css']);
   // grunt.registerTask('default', ['watch']);
};
