var gulp = require('gulp');
var uglify = require('gulp-terser');
var del = require('del');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var csso = require('gulp-csso');
var purify = require('gulp-purifycss');

var buildBabylon = false;

//list of script dependencies property explorer depends on, relative to the Scripts folder.
//these will be minified and concatenated to Scripts/build/connectDependencies.js
var connectDependencies = [
    'bundleA-scripts.js'//,
   // 'jquery-ui.min.js',
   // 'bootstrap.bundle.min.js',
   // 'bootstrap-colorpicker.min.js',
   // 'bundleB-scripts.js'//,
   //'jquery.mask.min.js'
]

var bundleDependencies = [
    'bootstrap.bundle.min.js',
    'bootstrap-colorpicker.min.js',
    'bundleB-scripts.js'
]

var babylonDependencies = [
    'pep.min.js',
    'dat.gui.min.js',
    'cannon.js',
    'Oimo.js',
    'gltf_validator.js',
    'earcut.min.js',
    'babylon.js',
    'babylon.inspector.bundle.js',
    'babylonjs.materials.min.js',
    'babylonjs.proceduralTextures.min.js',
    'babylonjs.postProcess.min.js',
    'babylonjs.loaders.js',
    'babylonjs.serializers.min.js',
    'babylon.gui.min.js'
]

var siteCss = [
    'Site.css',
    'jstree.css',
    'Dependencies/bootstrap.css',
    'Dependencies/bootstrap-colorpicker.min.css',
    'bootstrap-overrides.css'
]

var depLen = connectDependencies.length;
while (depLen--) {
    connectDependencies[depLen] = './Scripts/' + connectDependencies[depLen];
}

depLen = bundleDependencies.length;
while (depLen--) {
    bundleDependencies[depLen] = './Scripts/' + bundleDependencies[depLen];
}

depLen = babylonDependencies.length;
while (depLen--) {
    babylonDependencies[depLen] = './Scripts/Babylon/' + babylonDependencies[depLen];
}

depLen = siteCss.length;
while (depLen--) {
    siteCss[depLen] = './Content/' + siteCss[depLen];
}

var getBuildFunc = function () {

    return function (done) {

        var outputName = 'connectDependencies.js';

        var bundleOutputName = 'bundleDependencies.js';

        del.sync(['./Scripts/Build/Dependencies/**'], function (err, deletedFiles) {
            if (err) {
                console.log(err);
            }
        });

        var res = gulp.src(connectDependencies)
            .pipe(concat(outputName))
            .pipe(gulpif(true, uglify().on('error', function (e) {
                console.log(e);
            })))
            .pipe(rev())
            .pipe(gulp.dest('./Scripts/Build/Dependencies/Connect'))  // write rev'd assets to build dir
            .pipe(rev.manifest())
            .pipe(gulp.dest('./Scripts/Build/Dependencies/Connect'))

        

        res = gulp.src(bundleDependencies)
            .pipe(concat(bundleOutputName))
            .pipe(gulpif(true, uglify().on('error', function (e) {
                console.log(e);
            })))
            .pipe(rev())
            .pipe(gulp.dest('./Scripts/Build/Dependencies/Bundle'))  // write rev'd assets to build dir
            .pipe(rev.manifest())
            .pipe(gulp.dest('./Scripts/Build/Dependencies/Bundle'))

        outputName = 'siteCss.css';

        del.sync(['./Content/Build/**'], function (err, deletedFiles) {
            if (err) {
                console.log(err);
            }
        });

        gulp.src(siteCss)
            .pipe(concat(outputName))
            .pipe(gulpif(true, csso().on('error', function (e) {
                console.log(e);
            })))
            //.pipe(purify(['./Scripts/bundleA-scripts.js', './Scripts/bundleB-scripts.js', './Views/Home/*.cshtml', './Views/Shared/*.cshtml']))
            .pipe(gulp.dest('./Content/Build'))
            .pipe(rev())
            .pipe(gulp.dest('./Content/Build'))  // write rev'd assets to build dir
            .pipe(rev.manifest())
            .pipe(gulp.dest('./Content/Build'))

			if (buildBabylon)
			{
        outputName = 'babylonDependencies.js';

        return gulp.src(babylonDependencies)
            .pipe(concat(outputName))
            .pipe(gulpif(true, uglify().on('error', function (e) {
                console.log(e);
            })))
             .pipe(gulp.dest('./Scripts/Build/Babylon'))
            .pipe(rev())
            .pipe(gulp.dest('./Scripts/Build/Babylon'))  // write rev'd assets to build dir
            .pipe(rev.manifest())
            .pipe(gulp.dest('./Scripts/Build/Babylon'))
		}
		
		return res;
    }

};
module.exports = getBuildFunc;