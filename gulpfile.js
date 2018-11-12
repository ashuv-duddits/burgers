var gulp         		= require('gulp'),
		sass         	= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		cleanCSS     	= require('gulp-clean-css'),
		notify     		= require('gulp-notify'),
		wait     		= require('gulp-wait'),
		sourcemaps     	= require('gulp-sourcemaps'),
		rename  		= require('gulp-rename'),
		browserSync  	= require('browser-sync').create(),
		concat      	= require('gulp-concat'),
		uglify       	= require('gulp-uglify');

gulp.task('browser-sync', ['sass', 'scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
				notify: false
    });
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
	.pipe(wait(1000))
	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(sass().on('error', notify.onError()))
    	.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer({browsers: ['last 4 versions'], cascade: false}))
		.pipe(cleanCSS())
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src(['./js_libs/*.js'])
		.pipe(concat('libs.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify()) 
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js_libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on('change', browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});