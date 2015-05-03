// Some Gulp automation for packaging the app for different TV platforms

var gulp = require('gulp'),
    //path = require('path'),
    gutil = require('gulp-util'),
    //fs = require('fs'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    //template = require('gulp-template'),
    //rename = require('gulp-rename'),
    //filter = require('gulp-filter'),
    //watch = require('gulp-watch'),
    copy = require('gulp-copy'),
    usemin = require('gulp-usemin'),
    include = require('gulp-include'),
    debug = require('gulp-debug');
//copy = require('gulp-copy');

var target = gutil.env.target;

if (!target || !(target === 'default' || target === 'samsung')) {
    gutil.log(gutil.colors.red('\n====\nPlease provide --target=default|samsung\n====\n'));
    return;
}

var arrJS = ["app/js/light.js",
    "app/js/fen.js",
    "app/js/" + target + ".js",
    "app/js/nav.js",
    "app/js/poll.js",
    "app/js/app.js"
];

gulp.task('minify', function() {
    gulp.src(['app/css/**/*.css', "!app/css/*.min.css"])
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/css/'))
        .pipe(gulp.dest('./targets/' + target + '/css/'));

    gulp.src(arrJS)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/'))
        .pipe(gulp.dest('./targets/' + target + '/js/'));
    
});

gulp.task('copysamsung', function(){
   gulp.src('**/*.*', {cwd : './targets/samsung/'})
        .pipe(gulp.dest('/Users/jcarolus/htdocs/host.vbox001/Samsung/Apps/Chess/')); 
});

gulp.task('default', ['minify'], function() {

    gulp.src('./images/**/*.*', {cwd : './app/', base: './app'})
        //.pipe(debug())
        .pipe(copy('./targets/' + target + '/'));
    
    gulp.src(['./app/index.html'])
        .pipe(include())
        .pipe(usemin())
        .pipe(gulp.dest('./targets/' + target + '/'));

});
