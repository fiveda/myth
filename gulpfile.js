// 加载gulp插件 
'use strict'; 
var gulp = require('gulp'), 
browserSync = require('browser-sync').create(), 
SSI = require('browsersync-ssi'), 
concat = require('gulp-concat'), 
minifyCss = require('gulp-minify-css'), 
minify = require('gulp-minify'), 
plumber = require('gulp-plumber'), 
rename = require('gulp-rename'), 
babel = require('gulp-babel'),
// sass = require('gulp-sass'), 
zip = require('gulp-zip');
// 构建一个处理静态文件的 server ，并监听工作目录，当工作目录有文件变化时立即进行相关操作并执行 browserSync.reload 重新加载页面。 
gulp.task('server', function() { 
	browserSync.init({ 
		server: { 
			baseDir:["src"], 
			middleware:SSI({ 
				baseDir:'./dist', 
				ext:'.shtml', 
				version:'2.10.0' 
			}) 
		} ,
		open: false,
		notify: false
	}); 
	gulp.watch(['src/*.mjs','src/*.js', 'src/*.html', 'src/*.css'], browserSync.reload);
});
// 编译 sass 文件、并自动注入到浏览器 
// gulp.task('sass', function() { 
// 	return gulp.src("src/app/scss/**/*.scss") 
// 		.pipe(plumber()) 
// 		.pipe(sass.sync().on('error', sass.logError)) 
// 		.pipe(sass({outputStyle:"compact"})) 
// 		.pipe(gulp.dest("dist/styles")) 
// 		.pipe(browserSync.stream()); 
// });
// 压缩 javascript 文件 
// javscript files operate 
gulp.task('js', function(){ 
	return gulp.src('src/*.js') 
		.pipe(plumber()) 
		// .pipe(minify()) 
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest("dist/scripts")) 
		.pipe(browserSync.stream()); 
});
// 处理 html 文件 
//html 
gulp.task('html', function() { 
	return gulp.src("src/*.html") 
		.pipe(plumber()) 
		.pipe(gulp.dest("dist/")) 
		.pipe(browserSync.stream()); 
});
// 打包发布目标文件 
// publish 
gulp.task('publish', function(){ 
	return gulp.src('dist/**/*') 
		.pipe(plumber()) 
		.pipe(zip('publish.zip')) 
		.pipe(gulp.dest('release')) 
});
// 编辑默认任务 
gulp.task('default', ['server']);
gulp.task('build',['js','html']);