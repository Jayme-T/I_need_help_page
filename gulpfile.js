var gulp = require('gulp');
var path = require('path');

//css
var compass = require('gulp-compass'),
   // sass = require('gulp-sass'),
   autoprefixer = require('gulp-autoprefixer'),
   minifycss  = require('gulp-cssnano'),
   watch = gulp.watch,
   gutil = require('gulp-util');


// const JS_BUILD_DIR = path.resolve(__dirname, './public/js');
const CSS_BUILD_DIR = path.resolve(__dirname, './public/css');

gulp.task('watch', ['css-dev'], function() {
   gulp.watch('./styles/*',  ['css-dev']);
});
gulp.task('css-dev', function() {
   return gulp.src('./styles/**/*.scss')
      .pipe(compass({
         sass     : './styles',
         css      : CSS_BUILD_DIR,
         logging  : true,
         comments : true,
      }))
      .on('error', function(err) {
         gutil.log("Gulp Error in 'Development Task'", err.toString());
         this.emit('end'); //resumes watch after error
      })
      .pipe(autoprefixer())
      .pipe(gulp.dest(CSS_BUILD_DIR))
});
