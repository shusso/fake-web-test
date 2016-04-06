module.exports = function(grunt) {
    grunt.initConfig({
        mb: {
            options: {
                path: 'node_modules/.bin/mb',
                pathEnvironmentVariable: 'MB_EXECUTABLE'
            },
            start: ['--port', 2525, '--allowInjection', '--mock', '--debug', '--pidfile', 'mb-grunt.pid'],
            restart: ['--port', 2525, '--allowInjection', '--mock', '--debug', '--pidfile', 'mb-grunt.pid'],
            stop: ['--pidfile', 'mb-grunt.pid']
        },
    });

    grunt.loadNpmTasks('grunt-mountebank');
    grunt.registerTask('mb-start', ['mb:start']);
    grunt.registerTask('mb-stop', ['mb:stop']);
    grunt.registerTask('mb-restart', ['mb:restart']);
};