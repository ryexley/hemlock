const { capitalize, merge } = require( "lodash" );
const { hydraExpress } = require( "./helpers/hydra" );
const middleware = require( "./middleware" );
const log = require( "./logger" );
const configuration = require( "./config/" );

module.exports = {
    runService( { serviceConfig, router, preInit } ) {
        const serviceName = capitalize( serviceConfig.hydra.serviceName );

        configuration.load()
            .then( config => {
                const _serviceConfig = merge( config.service, serviceConfig );

                if ( preInit && typeof preInit === "function" ) {
                    preInit( config );
                }

                hydraExpress.init( _serviceConfig, _serviceConfig.hydra.version, router, middleware( _serviceConfig ) )
                    .then( serviceInfo => {
                        log.info( `${ serviceName } service now running (IP: ${ serviceInfo.serviceIP }, Port: ${ serviceInfo.servicePort })` );
                    } )
                    .catch( err => {
                        log.error( `Error initializing service ${ serviceName }`, err );
                    } );
            } )
            .catch( err => {
                log.error( `Error running service ${ serviceName }`, err );
            } );
    }
};
