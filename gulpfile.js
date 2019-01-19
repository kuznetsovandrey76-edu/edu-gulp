var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    // watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

var sass_src = 'resources/assets/sass/style.scss',
    sass_dist = 'public_html/assets/css',
    // watch
    sass_files = 'resources/assets/sass/**/*.scss';

var js_src = 'resources/assets/js/main.js',
    js_dist = 'public_html/assets/js',
    // watch
    js_files = 'resources/assets/js/**/*.js';

gulp.task('sass', function() {
    return gulp.src(sass_src)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(sass_dist))
        .pipe(browserSync.stream());
});
    
gulp.task('js', function() {
    return gulp.src(js_src)
        .pipe(uglify())
        .pipe(gulp.dest(js_dist))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    return del(['public_html/assets/']);
});


gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './public_html/'
        }
    });

    gulp.watch(sass_files, gulp.series('sass'));
    gulp.watch(js_files, gulp.series('js'));
    gulp.watch('./public_html/**/*.html', function() {
        browserSync.reload();
    });
});

gulp.task('build', gulp.series('clean', 
                        gulp.parallel('sass', 'js')));

gulp.task('dev', gulp.series('build', 'watch'));