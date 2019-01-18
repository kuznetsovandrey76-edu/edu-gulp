var gulp = require('gulp'),
    sass = require('gulp-sass');

var sass_src = 'resources/assets/sass/style.scss',
    sass_dist = 'public_html/css',
    sass_files = 'resources/assets/sass/**/*.scss';

gulp.task('sass', function() {
    return gulp.src(sass_src)
        .pipe(sass())
        .pipe(gulp.dest(sass_dist));
});

gulp.task('watch', function() {
    gulp.watch(sass_files, gulp.series('sass'));
});
