// Some Gulp automation for packaging the app for different TV platforms

var gulp = require('gulp'),
    //path = require('path'),
    //gutil = require('gulp-util'),
    //fs = require('fs'),
    //concat = require('gulp-concat'),
    watch = require('gulp-watch');


gulp.task('default', function() {

    // just copy all files to temp build dir
    gulp.src('**/*', { base: 'app' })
        //.pipe(watch('**/*', {verbose: true}))
        .pipe(gulp.dest('../Samsung/Apps/Chess/'));
});