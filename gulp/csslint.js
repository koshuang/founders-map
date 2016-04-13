/* jshint -W040, -W079 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('sasslint', function() {
    return gulp.src([options.src + '/styles/*.scss'])
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError())
      .on('error', errorAlert);
  });

  function errorAlert(error) {
    $.notify.onError({
      title: 'sass lint error',
      message: error.message
    })(error);

    this.emit('end');
  }
};
