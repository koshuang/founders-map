/* jshint -W079 */
'use strict';

var gulp = require('gulp');

var wiredep = require('wiredep');
var karma = require('karma');
var Server = karma.Server;
var concat = require('concat-stream');
var _ = require('lodash');

module.exports = function(options) {
  function listFiles(callback) {
    var bowerDeps = wiredep({
      directory: 'bower_components',
      exclude: [],
      dependencies: true,
      devDependencies: true
    });

    var customBowerDeps = [];

    var specFiles = [
      options.src + '/**/*.spec.js', {
        pattern: options.src + '/**/*.json',
        watched: true,
        served: true,
        included: false
      }
    ];

    var htmlFiles = [
      options.src + '/**/*.html'
    ];

    var srcFiles = [
      options.src + '/**/*.module.js',
      options.src + '/**/*.js'
    ].concat(specFiles.map(function(file) {
      return '!' + file;
    }));

    // For file created or deleted
    var allSrcFiles = [
      options.src + '/**/*.js'
    ];

    gulp.src(srcFiles)
      .pipe(concat(function(files) {
        callback(customBowerDeps
          .concat(bowerDeps.js)
          .concat(_.pluck(files, 'path'))
          .concat(htmlFiles)
          .concat(specFiles)
          .concat(allSrcFiles));
      }));
  }

  function runTests(singleRun, done) {
    listFiles(function(files) {
      var server = new Server({
        configFile: __dirname + '/../karma.conf.js',
        files: files,
        singleRun: singleRun,
        autoWatch: !singleRun
      }, done);

      server.start();
    });
  }

  gulp.task('test', function(done) {
    runTests(true, done);
  });

  gulp.task('test:watch', function(done) {
    runTests(false, done);
  });
};
