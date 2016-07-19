import gulp from 'gulp';
import concatCss from 'gulp-concat-css';
import cssmin from 'gulp-cssmin';
import runSequence from 'run-sequence';

const cssPath = 'src/stylesheets';

gulp.task('concat', () => gulp.src(`${cssPath}/app.css`)
  .pipe(concatCss('bundle.css'))
  .pipe(gulp.dest('dist/'))
);

gulp.task('minify', () => gulp.src('dist/bundle.css')
  .pipe(cssmin())
  .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => {
  gulp.watch(`${cssPath}/**/*.css`, ['concat']);
});

gulp.task('build', runSequence('concat', 'minify'));
