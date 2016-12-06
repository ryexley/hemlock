import { Router as routerFactory } from "express";
import apiFactory from "./api";
import webFactory from "./web";
import { join } from "path";

export default config => {
	const router = routerFactory();

	// TODO use api
	// TODO use web

	return router;
};
