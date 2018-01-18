const gulp = require('gulp');
const config = require('./config');

gulp.task('watch', () => {
  gulp.watch([config.lib, config.test], gulp.series('eslint', 'mocha'));
});
