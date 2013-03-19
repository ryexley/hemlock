const { app } = require( "../helpers/hydra" );
const authFactory = require( "./requiresAuth" );

module.exports = function( config ) {
    const requiresAuth = authFactory( config.auth );

    return function() {
        app.use( requiresAuth );
    };
};
