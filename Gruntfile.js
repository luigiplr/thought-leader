module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/src'
                }]
            }
        },
        clean: {
            build: ['build/'],
        },
        watchChokidar: {
            options: {
                spawn: true
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['newer:babel']
            }
        },
        nodemon: {
            script: 'thoughtleader.js',
            options: {
                cwd: 'build',
                delay: 200
            }
        },
        concurrent: {
            run: {
                tasks: ['nodemon', 'watchChokidar'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('default', ['clean:build', 'newer:babel', 'concurrent:run']);

    process.on('SIGINT', function() {
        process.exit(1);
    });
};