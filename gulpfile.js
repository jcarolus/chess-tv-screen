// Some Gulp automation for packaging the app for different TV platforms

var gulp = require('gulp'),
    //path = require('path'),
    //gutil = require('gulp-util'),
    //fs = require('fs'),
    //concat = require('gulp-concat'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    watch = require('gulp-watch');


gulp.task('samsung_template', function() {

    gulp.src('app/template.html')
        .pipe(template({
            target: 'samsung'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('../Samsung/Apps/Chess/'));

});

gulp.task('samsung', ['samsung_template'], function() {

    gulp.src(['**/*'], {
        base: 'app'
    })
    .pipe(filter(['**/*', '!*.html']))
    //.pipe(watch('**/*', {verbose: true}))
    .pipe(gulp.dest('../Samsung/Apps/Chess/'));

});

gulp.task('default', function() {

    gulp.src('app/template.html')
        .pipe(template({
            target: 'default'
        }))
        .pipe(rename('app/index.html'))
        .pipe(gulp.dest('./'));

});