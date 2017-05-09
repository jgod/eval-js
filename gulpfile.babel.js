import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';

gulp.task('lint-scripts', () =>
  gulp.src(['./dev/eval.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('lint-tests', () =>
  gulp.src(['./test/test-es6.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build-scripts', () =>
  gulp.src('./dev/eval.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('./prod'))
);

gulp.task('build-tests', () =>
  gulp.src('./test/test-es6.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(rename('./test/test.js'))
      .pipe(gulp.dest('.'))
);


gulp.task('build-prod', () => {
  runSequence(// Scripts
              'lint-scripts',
              'build-scripts',
              'lint-tests',
              'build-tests');
});