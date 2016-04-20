/* jshint -W040, -W079 */
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
      .pipe($.ghPages());
  });
};
