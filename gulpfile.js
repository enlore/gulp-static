/* jshint asi: true, laxcomma: true */
var gulp            = require("gulp")

var gMods = require("./gulp-autoload")

var jadeConf = {
    pretty: true
}

var stylusConf = {

}

gulp.task("default", ["layout", "style", "vendor", "watch", "serve"])

gulp.task("serve", function () {
    gMods["gulp-connect"].server({
        root: "dist",
        livereload: true,
        port: process.env.PORT || 3000
    })
})

gulp.task("layout", function () {
    gulp.src("src/layout/**/*.jade")
        //.pipe(gMods["gulp-filter"](function () {}))
        .pipe(gMods["gulp-jade"](jadeConf))
        .pipe(gMods["gulp-chmod"](664))
        .pipe(gulp.dest("dist/"))
})

gulp.task("style", function () {
    gulp.src("src/style/main*.styl")
        .pipe(gMods["gulp-stylus"](stylusConf))
        .pipe(gMods["gulp-autoprefixer"]({
                browsers: ["> 2%", "ie >= 8", "last 3 versions"]
        }))
        .pipe(gMods["gulp-chmod"](664))
        .pipe(gulp.dest("dist/css"))
})

gulp.task("script", function () {
    gulp.src("src/script/**/*.js")
        .pipe(gMods["gulp-concat"]("main.js"))
        .pipe(gMods["gulp-chmod"](664))
        .pipe(gulp.dest("dist/js"))
})

gulp.task("vendor", function () {
    //gulp.src(["node_modules/bootsrap/dist/css/bootstrap.min.css"])
        //.pipe(gMods["gulp-concat"]("deps.css"))

    //gulp.src(["node_modules/bootsrap/dist/js/bootstrap.min.js"])
        //.pipe(gMods["gulp-concat"]("deps.css"))

    gulp.src(["vendor/css/normalize.css", "vendor/css/skeleton.css"])
        .pipe(gMods["gulp-concat"]("deps.css"))
        .pipe(gMods["gulp-chmod"](664))
        .pipe(gulp.dest("dist/css/vendor"))

    gulp.src("vendor/js/**/*.js")
        .pipe(gMods["gulp-concat"]("deps.js"))
        .pipe(gMods["gulp-chmod"](664))
        .pipe(gulp.dest("dist/js/vendor"))
})

gulp.task("reload", function () {
    gulp.src("dist/**")
        .pipe(gMods["gulp-connect"].reload())
})

gulp.task("watch", function () {
    gulp.watch("src/layout/**/*.jade", ["layout"])
    gulp.watch("src/style/**/*.styl", ["style"])
    gulp.watch("vendor/**/*", ["vendor"])
    gulp.watch("dist/**", ["reload"])
})
