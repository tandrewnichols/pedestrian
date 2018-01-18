const gulp = require('gulp');

require('./gulp/clean');
require('./gulp/codeclimate');
require('./gulp/eslint');
require('./gulp/open');
require('./gulp/mocha');
require('./gulp/watch');

gulp.task('travis', gulp.series(gulp.parallel('lint', 'cover'), 'codeclimate'));
gulp.task('test', gulp.series('cover'));
gulp.task('default', gulp.series('lint', 'cover'));
