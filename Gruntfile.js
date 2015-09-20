module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            js: {
                files: {
                    'dist/ajaxSuite.min.js': ['src/js/main.js']
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'src'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'connect', 'watch']);
};
