/* jshint -W040, -W079 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('jshint', function() {
    return gulp.src([options.src + '/**/*.js'])
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'))
      .on('error', errorAlert);
  });

  function errorAlert(error) {
    $.notify.onError({
      title: 'jshint error',
      message: error.message
    })(error);

    this.emit('end');
  }
};
