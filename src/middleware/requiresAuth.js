const jwt = require( "express-jwt" );
const jwks = require( "jwks-rsa" );

module.exports = function( authConfig ) {
    const { secret, audience, issuer, algorithms } = authConfig;

    return jwt( {
        secret: jwks.expressJwtSecret( secret ),
        audience,
        issuer,
        algorithms
    } );
};
