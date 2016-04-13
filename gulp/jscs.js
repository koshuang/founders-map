/* jshint -W040, -W079 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var stylish = require('gulp-jscs-stylish');

module.exports = function(options) {
  gulp.task('jscs', function() {
    return gulp.src([options.src + '/**/*.js'])
      .pipe($.jscs())
      .pipe($.jscs.reporter())
      .pipe($.jscs.reporter('fail'))
      .on('error', errorAlert)
      .pipe(stylish());
  });

  function errorAlert(error) {
    $.notify.onError({
      title: 'jscs error',
      message: error.message
    })(error);

    this.emit('end');
  }
};
