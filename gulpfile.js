// Some Gulp automation for packaging the app for different TV platforms

var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    concat = require("gulp-concat");


gulp.task('default', function() {
  // place code for your default task here
    console.log('doing default');
    //gulp.start('concat', 'cssmin', 'uglify');
});

