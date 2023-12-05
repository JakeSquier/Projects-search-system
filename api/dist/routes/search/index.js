"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableSearchEndpoint = void 0;
const types_1 = require("./types");
function enableSearchEndpoint(router) {
    router.use('/search', (req, res, next) => {
        try {
            const searchRequestValidation = types_1.zSearchRequest.safeParse(req.query);
            if (!searchRequestValidation.success) {
                const errors = searchRequestValidation.error.format();
                //Throw error for incorrect params
                next(errors);
                return;
            }
            res.send(searchRequestValidation.data.term);
        }
        catch (ex) {
            next(ex);
        }
    });
}
exports.enableSearchEndpoint = enableSearchEndpoint;
