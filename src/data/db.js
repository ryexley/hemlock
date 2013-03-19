const thinky = require( "thinky" );
const helpersFactory = require( "./helpers" );

module.exports = function( config ) {
    const db = thinky( config );
    const extensions = helpersFactory( db );

    db.extensions = extensions;

    return db;
};
