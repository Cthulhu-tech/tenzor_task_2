//Connect the gulp modules
const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// Connection order of the sass/scss-files
const cssFiles = [
   './src/**/*.scss',
   './src/**/*.scss'
];

//Connection order of the js files
const jsFiles = [
   './src/**/*.js',
   './src/**/*.js'
];

//Task for CSS styles
function styles() {
   return gulp.src(cssFiles)
   .pipe(sourcemaps.init())
   .pipe(sass())
   //Merge files into one
   .pipe(concat('style.css'))
   //Add prefixes
   .pipe(autoprefixer())
   //CSS minification
   .pipe(cleanCSS({
      level: 2
   }))
   .pipe(sourcemaps.write('./'))
   //Output folder for styles
   .pipe(gulp.dest('./resources/css'))
   .pipe(browserSync.stream());
}

//Task for JS scripts
function scripts() {
   return gulp.src('src/**/*.ts')
   .pipe(ts({
      target: "es5",
      sourceMap: true,
      watch: true,
      removeComments: true,
      outFile: 'script.js'
   }))
   .pipe(gulp.dest('resources/js'));
}

//Task for Assets
function assets() {
   return gulp.src(['src/assets/**/*.{ttf,woff,eot,svg,otf,png}'])
   .pipe(gulp.dest('resources/assets'));
}

function pugViews() {
   return gulp.src([
      'src/index.pug',
   ])
   .pipe(pug({pretty: true}))
   .pipe(gulp.dest('./resources'))
   .pipe(concat('index.html'))
   .pipe(browserSync.stream());
}

//Delete all files from specified folder
function clean() {
   return del(['build/*'])
}

//Watch files
function watch() {
   browserSync.init({
      server: {
          baseDir: "./resources"
      }
  });
  //Watch CSS files
  gulp.watch('./src/**/*.css', styles);
  gulp.watch('./src/**/*.sass', styles);
  gulp.watch('./src/**/*.scss', styles);
  //Watch JS files
  gulp.watch('./src/**/*.ts', scripts);
  // Wath Pug files
  gulp.watch('./src/**/*.pug', pugViews);
  //Start synchronization after HTML changing
  gulp.watch("./src/index.pug").on('change', browserSync.reload);
}

//Task calling 'assets' function
gulp.task('assets', assets);
//Task calling 'pug' function
gulp.task('pug', pugViews);
//Task calling 'styles' function
gulp.task('styles', styles);
//Task calling 'scripts' function
gulp.task('scripts', scripts);
//Task for cleaning the 'build' folder
gulp.task('del', clean);
//Task for changes tracking
gulp.task('watch', watch);
//Task for cleaning the 'build' folder and running 'styles' and 'scripts' functions
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, pugViews, assets)));
//Task launches build and watch task sequentially
gulp.task('dev', gulp.series('build','watch'));
//Default task
gulp.task('default', gulp.series('build','watch'));
