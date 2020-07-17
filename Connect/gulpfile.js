'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var jsonminify = require('gulp-jsonminify');
var runSequence = require('run-sequence');

//gulp.task('minify-connectors', function () {
//    return gulp.src(['./Content/Connectors/*.json'])
//        .pipe(jsonminify())
//        .pipe(gulp.dest('./Content/Assets'));
//});

//gulp.task('minify-rods', function () {
//    return gulp.src(['./Content/Rods/*.json'])
//        .pipe(jsonminify())
//        .pipe(gulp.dest('./Content/Assets'));
//});

// add custom browserify options here
var optsA = {
    entries: ['./Scripts/Input/dependencies.js', './Scripts/Input/controllers.js', './Scripts/Input/extensions.js', './Scripts/Input/bindings.js'],
    debug: true
};
var ao = assign({}, watchify.args, optsA);
var a = watchify(browserify(ao));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('a', bundleA); // so you can run `gulp js` to build the file
a.on('update', bundleA); // on any dep update, runs the bundler
a.on('log', log.info); // output build logs to terminal

function bundleA() {
    return a.bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('bundleA-scripts.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./Scripts'));
}

var optsB = {
    entries: ['./Scripts/Input/component-bootstrapper.js', './Scripts/Input/widget-bootstrapper.js'],
    debug: true
};
var bo = assign({}, watchify.args, optsB);
var b = watchify(browserify(bo).transform('brfs'));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('b', bundleB); // so you can run `gulp js` to build the file
b.on('update', bundleB); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

function bundleB() {
    return b.bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('bundleB-scripts.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./Scripts'));
}

var tasks = [];

//build connect dependencies
var getConnectDepsBuildFunc = require('./Build/connectDependencies');
gulp.task('production', [], getConnectDepsBuildFunc(true));

gulp.task('build', function (callback) {
    runSequence(
        ['a', 'b'],
        callback);
});

gulp.task('default', ['build']);