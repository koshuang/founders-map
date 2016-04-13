/* jshint -W079 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/index.css'
    ], { read: false });

    var injectScripts = gulp.src([
      options.src + '/**/*.js',
      options.tmp + '/serve/**/*.js', // babel-converted files
      '!' + options.src + '/**/*.es6.js',
      '!' + options.src + '/**/*.spec.js',
      '!' + options.src + '/**/*.mock.js'
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      // .pipe($.replace('ladda.min.css', 'ladda-themeless.min.css'))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
