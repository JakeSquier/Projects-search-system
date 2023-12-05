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
exports.enableDataEndpoint = void 0;
const types_1 = require("./types");
const cache_1 = require("./cache");
function enableDataEndpoint(router) {
    router.use('/data', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const dataRequestValidation = types_1.zDataRequest.safeParse(req.query);
            if (!dataRequestValidation.success) {
                const errors = dataRequestValidation.error.format();
                // Throw error for incorrect params
                res.send(errors);
                return;
            }
            const matchingEntries = [];
            const ids = dataRequestValidation.data.ids;
            for (const id of ids) {
                const match = yield (0, cache_1.fetchEntryById)(id);
                if (match) {
                    matchingEntries.push(match);
                }
            }
            res.send(matchingEntries);
        }
        catch (ex) {
            next(ex);
        }
    }));
}
exports.enableDataEndpoint = enableDataEndpoint;
