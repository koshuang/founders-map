/* jshint -W079 */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['jshint', 'jscs', 'sasslint', 'scripts', 'inject'], function() {
    gulp.start('watch:bower');
    gulp.start('watch:styles');
    gulp.start('watch:js');
    gulp.start('watch:html');
  });

  gulp.task('watch:bower', function() {
    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);
  });

  gulp.task('watch:styles', function() {
    gulp.watch([
      options.src + '/**/*.css',
      options.src + '/styles/**/*.scss'
    ], function(event) {
      if (isOnlyChange(event)) {
        $.runSequence('sasslint', 'styles');
      } else {
        gulp.start('inject');
      }
    });
  });

  gulp.task('watch:js', function() {
    gulp.watch(options.src + '/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

      if (isOnlyChange(event)) {
        $.runSequence('jscs', 'jshint', 'scripts');
      } else {
        $.runSequence('inject');
      }
    });
  });

  gulp.task('watch:html', function() {
    gulp.watch(options.src + '/**/*.html', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

      browserSync.reload(event.path);
    });
  });
};
