require( "babel-register" );
const logFactory = require( "bunyan-debug-filter" );
const config = require( "./config" )();
const log = logFactory( {
	name: config.name,
	level: config.logging.level,
	pattern: process.env.DEBUG
} );

module.exports = function() {
	return require( "./express" )( config ).start();
}();
