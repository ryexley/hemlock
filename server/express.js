import expressModule from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import { notFound, infoHeaders, errorHandler } from "./middleware";
import lodashExpressFactory from "lodash-express";
import { join } from "path";
import resourceFactory from "./resources";

export default config => {
	const express = expressModule();

	express.disable( "x-powered-by" );
	express.use( infoHeaders );
	express.use( ( req, res, next ) => {
		console.log( `Request ${ req.method } ${ req.url }` );
		next();
	} );
	express.use( "/", bodyParser.urlencoded( { extended: false } ) );
	express.use( "/", bodyParser.json() );
	express.use( "/", bodyParser.json( { type: "application/vnd.api+json" } ) );
	express.use( "/", bodyParser.text() );
	express.use( compression() );

	lodashExpressFactory( express, "html" );
	express.set( "view engine", "html" );
	express.set( "views", join( __dirname, "/resources/web" ) );

	express.use( logger( "dev" ) );

	// Set up resource routing
	express.use( resourceFactory( config ) );

	// Static resources
	express.use( config.http.urlPrefix || "/", expressModule.static( join( __dirname, "./public" ) ) );
	express.use( notFound );
	express.use( errorHandler );

	return {
		express,
		start() {
			express.listen( config.http.port, () => {
				console.log( `Express listening on port ${ config.http.port }.` );
			} );
			return express;
		}
	};
};
