var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    spritesmith = require('gulp.spritesmith'),
    image = require('gulp-image'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    // watch = require('gulp-watch'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

/** 
* VARS
**/

// SASS 
var sass_src = 'resources/assets/sass/style.scss',
    sass_dist = 'public_html/assets/css',
    // watch
    sass_files = 'resources/assets/sass/**/*.scss';

// JS 
var js_src = 'resources/assets/js/main.js',
    js_dist = 'public_html/assets/js',
    // watch
    js_files = 'resources/assets/js/**/*.js';

// SPRITES
var sprite_src = 'resources/assets/img/sprites/*.png',
    sprite_sass_path = 'resources/assets/sass',
    sprite_img_dist = 'public_html/assets/img';

// IMAGES
var images_src = 'resources/assets/img/images/**/*.{png,jpg,gif}',
    images_dist = 'public_html/assets/img';



// SASS
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
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(sass_dist))
        .pipe(browserSync.stream());
});
    
// JS
gulp.task('js', function() {
    return gulp.src(js_src)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(js_dist))
        .pipe(browserSync.stream());
});

// SPRITE
gulp.task('sprite', function () {
    var spriteData = gulp.src(sprite_src)
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss'
    }));   

    var imgStream = spriteData.img
        .pipe(gulp.dest(sprite_img_dist));

    var cssStream = spriteData.css
        .pipe(gulp.dest(sprite_sass_path));

    return merge(imgStream, cssStream);
});

// IMAGE
gulp.task('image', function() {
    return gulp.src(images_src)
        // .pipe(image())
        .pipe(imagemin())
        .pipe(gulp.dest(images_dist));
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
    gulp.watch('./public_html/**/*.html').on("change", reload);
});


gulp.task('build', gulp.series(
    'clean', 
    'sprite', 
    'image',
    'js', 
    'sass'
));

gulp.task('dev', gulp.series('build', 'watch'));