var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat 			= require('gulp-concat'),
	imagemin 		= require('gulp-imagemin'),
	minifyCss 		= require('gulp-minify-css'),
	notify 			= require('gulp-notify'),
	plumber 		= require('gulp-plumber'),
	sass 			= require('gulp-sass'),
	sourcemaps 		= require('gulp-sourcemaps'),
	uglify 			= require('gulp-uglify'),
	watch 			= require('gulp-watch'),
	jshint			= require('gulp-jshint'),
	browserify		= require('gulp-browserify2'),
	source 			= require('vinyl-source-stream'),
	pngquant		= require('imagemin-pngquant');

var source = {
	sass:'app/sass/**/*.scss',
	script:'app/scripts/**/*.js',
	mainjs:'app/scripts/main.js',
	html:'app/**/*.html'
};

var dest = {
	css:'public/css',
	js:'public/js',
	html:'public'
};

//var jsRequirements = concat(angular,firebase,angularfire);

/*error handler*/

var onError = function(err){
	console.log(err);
	this.emit('end');
}

/*TASKS*/
/*---------------------------------------------------*/

/*compile sass*/

gulp.task('sass',function(){
	return gulp.src(source.sass)
		        .pipe(plumber({
		        	errorHandler:onError
		        }))
		        .pipe(sass())
		        .pipe(autoprefixer('last 2 versions'))
		        .pipe(gulp.dest(dest.css))
		        .pipe(minifyCss())
		        .pipe(sourcemaps.init())
		        .pipe(sourcemaps.write())
		        .pipe(gulp.dest(dest.css))
		        .pipe(notify("hey you sexy beast!"));
});

/*---------------------------------------------------*/

/*compile JS*/

gulp.task('js',function(){
	return gulp.src(source.mainjs)
	.pipe(browserify({
		fileName:'bundle.js'
	}))
	/*.pipe(jshint())
	.pipe(jshint.reporter('default'))*/
	.pipe(plumber({
		        	errorHandler:onError
		        }))
	.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest(dest.js));
});

/*---------------------------------------------------*/
/*html*/
gulp.task('html',function(){
	return gulp.src(source.html)
		.pipe(gulp.dest(dest.html));

});


/*---------------------------------------------------*/

/*watch changes*/

gulp.task('watch',function(){
	gulp.watch(source.sass,['sass']);
	gulp.watch(source.script,['js']);
	gulp.watch(source.html,['html']);
});


gulp.task('default',['watch','sass','js','html']);