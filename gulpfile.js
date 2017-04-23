var gulp = require("gulp");
var del = require('del');
var mocha = require('gulp-mocha');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function () {
  return del(['dist']);
});

gulp.task("compile", ["clean"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("test", function() {
  return gulp.src(['dist/test/**/*Spec.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task("default", ["compile"]);
