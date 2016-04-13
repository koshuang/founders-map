'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(
        options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    browserSync.instance = browserSync.init({
      // Don't show any notifications in the browser.
      notify: false,
      port: 9000,
      ui: {
        port: 9001
      },
      startPath: '/',
      server: server,
      browser: browser,
      logFileChanges: false,
      logLevel: 'warn'
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]' // Only needed for angular apps
  }));

  gulp.task('serve', ['watch'], function() {
    browserSyncInit([
      options.tmp + '/serve',
      options.tmp + '/es5',
      options.src
    ]);

    gulp.start('test:watch');
  });

  gulp.task('serve:dist', ['build'], function() {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function() {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function() {
    browserSyncInit(options.dist, []);
  });
};
