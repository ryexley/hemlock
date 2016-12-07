import { Router as routerFactory } from "express";

export default () => {
	const router = routerFactory();

	router.get( "/", ( req, res ) => {
		res.render( "./index.html" );
	} );

	return router;
};
