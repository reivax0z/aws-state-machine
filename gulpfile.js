var gulp = require("gulp");
var del = require('del');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
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
  var envs = env.set({
    RUNNING_ENV: 'REMOTE'
  });
  return gulp.src(['dist/test/**/*Spec.js'], { read: false })
    .pipe(envs)
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(envs.reset);
});

gulp.task("default", ["compile"]);
