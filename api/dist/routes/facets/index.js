"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableFacetsEndpoint = void 0;
const types_1 = require("./types");
const cache_1 = require("./cache");
function enableFacetsEndpoint(router) {
    router.use('/facets', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const facetsRequestValidation = types_1.zFacetsRequest.safeParse(req.query);
            if (!facetsRequestValidation.success) {
                const errors = facetsRequestValidation.error.format();
                // Throw error for incorrect params
                res.send(errors);
                return;
            }
            // const dataTag = facetsRequestValidation.data.dataTag
            const facets = yield (0, cache_1.getFacets)();
            res.send(facets);
        }
        catch (ex) {
            next(ex);
        }
    }));
}
exports.enableFacetsEndpoint = enableFacetsEndpoint;
