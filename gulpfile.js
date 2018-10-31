const gulp = require('gulp');
const server = require('gulp-server-livereload');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumberNotifier = require('gulp-plumber-notifier');
const changed = require('gulp-changed');
sass.compiler = require('node-sass');

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});



gulp.task('html', function(){
  gulp.src('./app/*.pug')
  
  .pipe(changed('./dist/'))
  .pipe(plumberNotifier())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
});
gulp.task('img', function(){
  gulp.src('./app/img/*')
  .pipe(changed('./dist/img/'))
  .pipe(gulp.dest('./dist/img/'))
})
gulp.task('js', function(){
  gulp.src('./app/js/*.js')
  .pipe(changed('./dist/js/'))
  .pipe(gulp.dest('./dist/js/'))
})
gulp.task('css', function () {
  return gulp.src('./app/scss/*.scss')
  
  .pipe(changed('./dist/css'))
  .pipe(plumberNotifier())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 20 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function(){
  gulp.watch('./app/js/*.js', ['js'])
  gulp.watch(['./app/*.pug','./app/partials/*.pug'], ['html'])
  gulp.watch('./app/scss/*.scss', ['css'])
})

gulp.task('default', ['img','js','watch','html','css','webserver']);