const gulp = require('gulp');
const fs = require('fs-extra');

gulp.task('clean', (cb) => {
  fs.extra('./coverage', cb);
});

