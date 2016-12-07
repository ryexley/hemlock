import HTTPStatus from "http-status";

export default function notFound( req, res ) {
	console.log( { url: req.url, notFound: true }, "Request url not found" );
	res.status( HTTPStatus.NOT_FOUND ).send( { message: "Not Found" } );
}
