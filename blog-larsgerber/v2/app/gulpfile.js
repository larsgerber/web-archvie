const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');
const runList = [jsTask, cssTask, copyIcons, copyImages, copyLogo, copyFiles]

function jsTask() {
    return src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function cssTask() {
    return src(["src/css/**/styles.css", "src/css/**/markdown.css"])
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}

function copyIcons() {
    return src("src/icon/**")
        .pipe(dest('dist/icon'));
}

function copyImages() {
    return src("src/img/**")
        .pipe(dest('dist/img'));
}

function copyLogo() {
    return src("src/logo/**")
        .pipe(dest('dist/logo'));
}

function copyFiles() {
    return src(["src/robots.txt", "src/sitemap.xml"])
        .pipe(dest('dist/'));
}

function watchTask() {
    watch(["src/**"], { interval: 1000 }, parallel(runList));
}

exports.default = series(parallel(runList), watchTask);
exports.build = series(parallel(runList));