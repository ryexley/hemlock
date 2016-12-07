import { Router as routerFactory } from "express";
import apiFactory from "./api";
import webFactory from "./web";
import { join } from "path";

export default config => {
	const router = routerFactory();

	router.use( "/", webFactory() );
	router.use( "/api", apiFactory() );

	return router;
};
