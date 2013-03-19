const hydraExpress = require( "fwsp-hydra-express" );

module.exports = {
    info( message ) {
        hydraExpress.log( "info", message );
    },

    debug( message ) {
        hydraExpress.log( "debug", message );
    },

    error( message ) {
        hydraExpress.log( "error", message );
    },

    fatal( message ) {
        hydraExpress.log( "fatal", message );
    }
};
