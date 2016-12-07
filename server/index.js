require( "babel-register" );
const config = require( "./config" )();

module.exports = function() {
	return require( "./express" )( config ).start();
}();
