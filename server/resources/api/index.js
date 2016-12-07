import { Router as routerFactory } from "express";
import HTTPStatus from "http-status";

export default () => {
	const router = routerFactory();

	router.get( "/", ( req, res ) => {
		res.status( HTTPStatus.OK ).send( {
			message: "Hemlock API root"
		} );
	} );

	return router;
};
