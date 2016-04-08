// Karma configuration

module.exports = function (config) {
    config.set({

        basePath: '.',

        frameworks: ['jasmine'],

        files: [

            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dist/ng-nested-combobox.js',
            'test/unit/**/*.spec.js'
        ],

        preprocessors: {
            'dist/templates/**/*.html': 'ng-html2js'
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'dir-templates'
        },

        reports: ['progress'],

        port: 9876,

        colors: true,

        // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

        captureTimeout: 60000,

        plugins: [
            'karma-firefox-launcher',
            'karma-mocha',
            'karma-should',
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        singleRun: false
    });
};