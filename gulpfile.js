"use strict";

const gulp = require( "gulp" );
const util = require( "gulp-util" );

const ejs = require( "gulp-ejs" );
const sass = require( "gulp-sass" );
const autoprefixer = require( "gulp-autoprefixer" );
const sourcemaps = require( "gulp-sourcemaps" );

const watch = require( "gulp-watch" );

const webserver = require( "gulp-webserver" );

const argv = require( "yargs" )
	.usage( "Usage: [-p profile]" )
	.describe( "p", "Active profile to load configuration from" )
	.alias( "p", "profile" )
	.default( "p", "local" )
	.argv;
const profile = argv.p;
const profileConfig = require( "./config/" + profile );

const config = {
	source: {
		sass: [
			"src/app/**/*.scss",
			"src/app/**/*.sass"
		]
	},
	nodeDependencies: [
		"node_modules/es6-shim/es6-shim.js",
	    "node_modules/systemjs/dist/system-polyfills.src.js",
	    "node_modules/angular2/bundles/angular2-polyfills.js",
	    "node_modules/systemjs/dist/system.src.js",
	    "node_modules/rxjs/bundles/Rx.js",
	]
};

gulp.task( "node-dependencies:copy", () => {
	return gulp.src( config.nodeDependencies ).pipe( gulp.dest( "src/assets/node_modules" ) );
});

gulp.task( "styles:compile", () => {
	return gulp.src( config.source.sass, { base: "./" } )
		.pipe( ejs( profileConfig ) )
		.pipe( sourcemaps.init() )
		.pipe( sass().on( "error", sass.logError ) )
		.pipe( autoprefixer({
			browsers: [ "last 2 versions" ]
		}) )
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( "." ) )
		;
});

gulp.task( "serve", [ "node-dependencies:copy", "styles:compile" ], () => {
	return gulp.start( "serve:afterBuild" );
});

gulp.task( "serve:afterBuild", () => {
	watch( config.source.sass, ( file ) => {
		util.log( "SCSS file changed: ", file.path );
		gulp.start( "styles:compile" );
	}).on( "error", ( error ) => {
		util.log( util.colors.red( "Error" ), error.message );
	});

	return gulp.src( "." )
		.pipe( webserver({
			livereload: false,
			directoryListing: false,
			fallback: "/src/index.html",
			open: true,
		}) );
});
