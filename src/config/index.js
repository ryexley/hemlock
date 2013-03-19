const { existsSync } = require( "fs" );
const { resolve: resolvePath, join } = require( "path" );
const os = require( "os" );
const { merge } = require( "lodash" );
const configya = require( "configya" );
const defaults = require( "./config.defaults.json" );

function getEnvConfig() {
    const env = process.env.CIRCLES_ENV || "dev";
    const envConfigFile = resolvePath( join( __dirname, `config.${ env }.json` ) );
    let envConfig = {};

    if ( existsSync( envConfigFile ) ) {
        envConfig = require( envConfigFile ); // eslint-disable-line global-require
    }

    return envConfig;
}

function loadConfig() {
    const envConfig = getEnvConfig();
    const configOptions = {
        prefix: "circles",
        defaults: Object.assign( {}, defaults, envConfig )
    };

    const localConfigFile = resolvePath( __dirname, "../../config.json" );
    if ( existsSync( localConfigFile ) ) {
        configOptions.file = localConfigFile;
    }

    const config = configya( configOptions );
    config.identity = `${ os.hostname() }.${ config.name }.${ process.pid }`;
    process.title = config.name;

    return config;
}

const config = {
    getServiceConfig( properties = {} ) {
        return new Promise( ( resolve, reject ) => {
            /* eslint-disable indent */
            config.load()
                .then( ( { service } ) => {
                    const result = merge( service, properties );
                    resolve( result );
                } )
                .catch( reject );
            /* eslint-enable indent */
        } );
    },

    load() {
        return new Promise( ( resolve, reject ) => {
            try {
                const result = loadConfig();
                resolve( result );
            } catch ( err ) {
                reject( err );
            }
        } );
    }
};

module.exports = config;
