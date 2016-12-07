import HTTPStatus from "http-status";

export default function errorHandler() {
	const error = err.originalError || err;
	console.error( { err: error }, "Error caught by middleware" );

	res.status( HTTPStatus.INTERNAL_SERVER_ERROR ).json( {
		message: HTTPStatus[ HTTPStatus.INTERNAL_SERVER_ERROR ]
	} );
}
