/* jshint -W079 */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var path = require('path');

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('styles', ['styles:inject'], function () {
    return gulp.src([])
      .pipe($.compass({
        css: path.join(__dirname, '..', options.tmp) + '/serve/styles',
        sass: path.join(__dirname, '..', options.src) + '/styles/',
        import_path: path.join(__dirname, '..', options.src) + '/styles/',
        debug: false
      }))
      .on('error', options.errorHandler('Compass'))
      .pipe(gulp.dest(options.tmp + '/serve/'))
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.task('styles:inject', function () {
    var injectFiles = gulp.src([
      options.src + '/styles/_variable.scss',
      options.src + '/styles/**/*.scss',
      '!' + options.src + '/styles/app.scss'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.src + '/styles/', '')
                           .replace('_', '')
                           .replace('.scss', '');
        return '@import "' + filePath + '";';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var mainFilter = $.filter('app.scss');
    var vendorFilter = $.filter('vendor.scss');

    return gulp.src([
        options.src + '/styles/app.scss',
        options.src + '/styles/vendor.scss',
      ])
      .pipe(mainFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(mainFilter.restore())
      // .pipe(vendorFilter)
      .pipe(wiredep(options.wiredep))
      // .pipe(vendorFilter.restore())
      .pipe(gulp.dest(options.src + '/styles'));
  });
};
