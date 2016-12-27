const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('mocha', function() {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      reporter: 'nyan',
    }));
});

gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint', 'mocha']);
});

gulp.task('default', ['watch']);
