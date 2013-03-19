module.exports = function( db ) {
    const { r, type } = db;

    return {
        table: {
            auditable: {
                isActive: type.boolean(),
                isDeleted: type.boolean().default( false ),
                created: type.date().default( r.now() ),
                updated: type.date()
            }
        }
    };
};
