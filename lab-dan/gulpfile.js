'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')
const plumber = require('gulp-plumber')

const LIB_PATH = './lib/**/*.js'
const TEST_PATH = './test/**/*.js'

// copy-pasted the code from https://github.com/adametry/gulp-eslint for the comments
// then slightly modified
gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js','!node_modules/**'])
    // plumber to better handle errors
    .pipe(plumber())
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
})

gulp.task('mocha', function () {
  return gulp.src([TEST_PATH], {read:false})
    // plumber to better handle errors
    .pipe(plumber())
    .pipe(mocha())
})

gulp.task('dev', function () {
  gulp.watch([LIB_PATH, TEST_PATH], ['lint', 'mocha'])
})

// run through lint and mocha the first time, and then start watching the files
gulp.task('default', ['lint','mocha','dev'])
