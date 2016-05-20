// =============================================
// load plugins
// =============================================
import babel       from "gulp-babel";
import browserSync from "browser-sync";
import gulp        from "gulp";
import mocha       from "gulp-mocha";
import plumber     from "gulp-plumber";
import jsbeautifier from "gulp-jsbeautifier";

let serve = browserSync.create();

gulp.task("serve", ()=>{
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/**/*.js", gulp.parallel("js", "test")).on('change', browserSync.reload);
  gulp.watch("./index.html").on('change', browserSync.reload);
});


gulp.task("js", ()=>{
  return gulp.src("src/**/*.js")
  .pipe(plumber())
  .pipe(babel({
    presets: ['es2015'],
    plugins: ["external-helpers-2","transform-es2015-modules-umd"]
  }))
  .pipe(jsbeautifier())
  .pipe(gulp.dest("dist"));
});

gulp.task("test", ()=>{
  return gulp.src("test/test.js")
  .pipe(plumber())
  .pipe(mocha( { compilers: { js: babel } }));
});


gulp.task("default", gulp.parallel("serve"));
