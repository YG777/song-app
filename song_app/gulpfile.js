const gulp        = require('gulp');
const sass        = require('gulp-sass');
const nodemon     = require('gulp-nodemon');
const cleanCSS    = require('gulp-clean-css');
const plumber     = require('gulp-plumber');
const browserSync   = require('browser-sync').create();

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public/css'));
    
});

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 8000,
    files: ['public/**/*.*'],
    reloadDelay: 500,
    notify: false,
    open: true
  });

  return nodemon({ script: 'app.js'})
    .on('start', () => browserSync.reload());
});

gulp.task('default', ['sass', 'serve'], () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('views/**/*.ejs', browserSync.reload);
});


