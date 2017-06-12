'use strict'

import 'babel-register';
import assets from 'postcss-assets';
import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import cssnano from 'cssnano';
import concat from 'gulp-concat';
import debug from 'gulp-debug';
import deporder from 'gulp-deporder';
import gulp from 'gulp';
import htmlclean from 'gulp-htmlclean'
import mqpacker from 'css-mqpacker';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import stripdebug from 'gulp-strip-debug';
import uglify from 'gulp-uglify';

const folder = {
        src: 'app/assets/',
        build: 'public/'
      }

gulp.task('css', () => {

  const postCssOpts = [
    assets({ loadPaths: ['images/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ];

  return gulp.src(`${folder.src}scss/**/*`)
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(debug(postcss(postCssOpts)))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(`${folder.build}css/`))
});

gulp.task('default', ['run', 'watch']);

gulp.task('html', () => {
  let out = `${folder.build}html/`
  
  gulp.src(`${folder.src}html/**/*`)
    .pipe(htmlclean())
    .pipe(gulp.dest(out))
})

// JavaScript processing
gulp.task('js', () => {
  gulp.src(`${folder.src}js/**/*`)
    //.pipe(deporder())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(`${folder.build}js/`))
});

gulp.task('run', ['html', 'css', 'js']);

// watch for changes
gulp.task('watch', () => {

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // javascript changes
  gulp.watch(`${folder.src}js/**/*`, ['js']);

  // css changes
  gulp.watch(`${folder.src}scss/**/*`, ['css']);

});



