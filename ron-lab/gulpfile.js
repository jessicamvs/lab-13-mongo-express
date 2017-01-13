const gulp = require('gulp')
const mocha =  require('mocha')

gulp.task('test', function() {
  gulp.src('', {read: false})
  .pipe(mocha({reporter: 'nyan'}))
})
