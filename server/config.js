import { existsSync } from "fs";
import { join, resolve } from "path";
import os from "os";
import ConfigurationFactory from "configya";
import defaults from "../configs/config.defaults.json";

const machine = os.hostname();
const pid = process.pid;

// check for and load environment specific config file
const env = process.env.HEMLOCK_ENV || "dev";
const envConfigFile = resolve( join( __dirname, `../configs.${ env }.json` ) );
let envConfig = {};
if ( existsSync( envConfigFile ) ) {
	envConfig = require( envConfigFile );
}

// check for and load local config override at project level
const localConfigFile = resolve( "./config.json" );

export default function() {
	const configOptions = {
		prefix: "hemlock",
		defaults: Object.assign( {}, defaults, envConfig )
	};

	if ( existsSync( localConfigFile ) ) {
		configOptions.file = localConfigFile;
	}

	const config = ConfigurationFactory( configOptions );
	config.identity = `${ machine }.${ config.name }.${ pid }`;
	process.title = config.name;

	return config;
}
