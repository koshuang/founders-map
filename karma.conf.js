// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-10-17 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'jasmine', 'sinon', 'sinon-chai', 'chai', 'source-map-support'
    ],

    preprocessors: {
      '**/*.html': ['ng-html2js'],
      'app/**/!(*spec).js': ['coverage', 'babel'],
      'app/**/*spec.js': ['babel', 'sourcemap']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/'
    },

    client: {
      chai: {
        includeStack: true
      }
    },

    // list of files / patterns to exclude
    exclude: [
      '**/*.git',
      '**/angular-scenario.js' // is only used for e2e testing
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
      // 'Chrome'
    ],

    reporters: ['coverage', 'notify', 'dots'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Optional Settings
    notifyReporter: {
      reportEachFailure: true, // Default: false, Will notify on every failed sepc
      reportSuccess: false, // Default: true, Will notify when a suite was successful
      reportBackToSuccess: true // Default: true, Will notify when a suite was back to successful
    },

    // Which plugins to enable
    plugins: [
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-chai',
      'karma-coverage',
      'karma-source-map-support',
      'karma-sourcemap-loader',
      'karma-requirejs',
      'karma-notify-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
