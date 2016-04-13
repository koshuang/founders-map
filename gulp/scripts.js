/* jshint -W040, -W079 */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();
var eventStream = require('event-stream');

module.exports = function(options) {
  gulp.task('scripts', function() {
    return eventStream
      .merge(
        babelCompiler(options.src + '/**/*.es6.js', {
          suffix: '-converted'
        }),
        es5Script()
      );
  });

  function babelCompiler(src, renamer) {
    return gulp
      .src(src)
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe(renamer ? $.rename(renamer) : $.util.noop())
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.tmp + '/serve'));
  }

  function es5Script() {
    return gulp.src([options.src + '/**/*.js'])
      .pipe(browserSync.reload({
        stream: true 
      }))
      .pipe($.size());
  }
};
