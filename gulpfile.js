const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');

const notify = require("gulp-notify");
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

// const svgstore = require('gulp-svgstore');
// const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');

const paths =  {
	src: './src/',              // paths.src
	build: './app/'           // paths.build
  };

function styles() {
  return src(paths.src + 'sass/main.scss')
	//.pipe(wait(1000))
	.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on('error', notify.onError()))
		.pipe(groupMediaQueries())
    	.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer({browsers: ['last 4 versions'], cascade: false}))
		.pipe(cleanCSS())
	.pipe(sourcemaps.write('/'))
		.pipe(dest(paths.build + 'css/'))
		.pipe(browserSync.stream());
};

function scripts() {
	return src(paths.src + 'js/*.js')
	//   .pipe(babel({
	// 	presets: ['@babel/env']
	//   }))
	//   .pipe(uglify())
	//   .pipe(concat('main.min.js'))
	  .pipe(dest(paths.build + 'js/'))
  }

// function scriptsLibs() {
// 	return src([''
// 		//'node_modules/jquery/dist/jquery.min.js',
// 		//'node_modules/slick-carousel/slick/slick.min.js',
// 		//'node_modules/svg4everybody/dist/svg4everybody.min.js'
// 	  ])
// 	  .pipe(concat('libs.min.js'))
// 	  .pipe(dest(paths.build + 'js/'))
// }

// function svgSprite() {
// 	return gulp.src(paths.src + 'svg/*.svg')
// 	  .pipe(svgmin(function (file) {
// 		return {
// 		  plugins: [{
// 			cleanupIDs: {
// 			  minify: true
// 			}
// 		  }]
// 		}
// 	  }))
// 	  .pipe(svgstore({ inlineSvg: true }))
// 	  .pipe(rename('sprite-svg.svg'))
// 	  .pipe(gulp.dest(paths.build + 'img/'));
//   }

function fonts() {
	return src(paths.src + 'fonts/**/*.*')
	  .pipe(dest(paths.build + 'fonts/'));
}

function video() {
	return src(paths.src + 'video/**/*.*')
	  .pipe(dest(paths.build + 'video/'));
}

function htmls() {
	return src(paths.src + '*.html')
	  .pipe(dest(paths.build));
}
  
function images() {
	return src(paths.src + 'img/**/*.{jpg,jpeg,png,gif,svg}')
	  //.pipe(imagemin()) // если картинок будет много, то и времени будет уходить много
	  .pipe(dest(paths.build + 'img/'));
}

function clean() {
	return del('app/')
}

function watcher() {
	watch(paths.src + 'sass/**/*.scss', styles);
	watch(paths.src + 'js/*.js', scripts);
	watch(paths.src + '*.html', htmls);
}

function serve(){
	browserSync.init({
		server: {
			baseDir: paths.build
		},
		notify: false
	});
	browserSync.watch(paths.build + '**/*.{html,js}', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
// exports.scriptsLibs = scriptsLibs;
exports.fonts = fonts;
exports.video = video;
exports.htmls = htmls;
exports.images = images;
/*exports.svgSprite = svgSprite;*/
exports.clean = clean;
exports.watcher = watcher;


exports.build = series(clean, parallel(styles, /*svgSprite,*/ scripts, /*scriptsLibs,*/ fonts, video, htmls, images));
exports.default = series(clean,	parallel(styles, /*svgSprite,*/ scripts, /*scriptsLibs,*/ fonts, video, htmls, images), parallel(watcher, serve));