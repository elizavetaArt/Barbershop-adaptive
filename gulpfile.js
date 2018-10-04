"use strict";

let gulp = require("gulp");
let less = require("gulp-less");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("less/scaffolding.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html").on("change", server.reload);

});
gulp.task( 'default', [ 'serve' ] );