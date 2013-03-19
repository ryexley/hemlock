const hydraExpress = require( "fwsp-hydra-express" );

module.exports = ( function() {
    const app = hydraExpress.getExpressApp();
    const router = hydraExpress.getExpress().Router(); // eslint-disable-line new-cap
    const registerRoutes = hydraExpress.registerRoutes;

    return { hydraExpress, app, router, registerRoutes };
}() );
