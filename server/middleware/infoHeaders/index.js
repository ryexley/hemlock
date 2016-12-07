import info from "../../../package.json";

export default function infoHeaders( req, res, next ) {
	res.set( "x-app-name", info.name );
	res.set( "x-app-version", info.version );
	next();
}
