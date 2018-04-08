const gulp        = require('gulp');
const sass        = require('gulp-sass');
const cleanCSS    = require('gulp-clean-css');
const plumber     = require('gulp-plumber');

gulp.task('default', function() {
  console.log('gulp says hello');
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public/css'));
});