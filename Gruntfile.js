module.exports = function(grunt) {
    grunt.initConfig({
        mb: {
            options: {
                path: 'node_modules/.bin/mb',
                pathEnvironmentVariable: 'MB_EXECUTABLE'
            },
            start: ['--port', 2525, '--allowInjection', '--mock', '--debug', '--pidfile', 'mb-grunt.pid'],
            restart: ['--port', 2525, '--allowInjection', '--mock', '--debug', '--pidfile', 'mb-grunt.pid'],
            stop: ['--pidfile', 'mb-grunt.pid'],


        },
        http: {
            imposter_data : {
                options: {
                    url: 'http://127.0.0.1:2525/imposters',
                    method: 'POST',
                    json: true,
                    body : {
                        "port": 4545,
                        "protocol": "http",
                        "stubs": [{
                            "responses": [
                                { "is": { "statusCode": 400 }}
                            ],
                            "predicates": [{
                                "and": [
                                    {
                                        "equals": {
                                            "path": "/test",
                                            "method": "POST",
                                            "headers": {
                                                "Content-Type": "application/json"
                                            }
                                        }
                                    },
                                    {
                                        "not": {
                                            "contains": {
                                                "body": "requiredField"
                                            },
                                            "caseSensitive": true
                                        }
                                    }
                                ]
                            }]
                        }]
                    }
                }
            },
            imposter_data_del : {
                options: {
                    url: 'http://127.0.0.1:2525/imposters/4545',
                    method: 'DELETE'
                }
            },

            uservice_producer: {
                options: {
                    url: 'http://127.0.0.1:2525/imposters',
                    method: 'POST',
                    json: true,
                    body: {
                        "port": 6666,
                        "protocol": "tcp",
                        "mode": "text",
                        "stubs": [{
                            "responses": [{
                                "is": {
                                    "data": "hello world is up, man\n\n"
                                }
                            }],
                            "predicates": [{
                                "contains": {
                                    "data": "whats up doc"
                                }
                            }],
                        }]
                    }
                }
                },
                uservice_producer_del: {
                    options: {
                        url: 'http://127.0.0.1:2525/imposters/6666',
                        method: 'DELETE'
                    }
                }
            }
    });

    //MounteBank
    grunt.loadNpmTasks('grunt-mountebank');
    grunt.registerTask('mb-start', ['mb:start']);
    grunt.registerTask('mb-stop', ['mb:stop']);
    grunt.registerTask('mb-restart', ['mb:restart']);
    //Set some data to MounteBank
    grunt.loadNpmTasks('grunt-http');
    //REST
    grunt.registerTask('add-data', ['http:imposter_data']);
    grunt.registerTask('remove-data', ['http:imposter_data_del']);
    //uServices
    grunt.registerTask('add-uservice-data', ['http:uservice_producer']);
    grunt.registerTask('remove-uservice-data', ['http:uservice_producer_del']);

};