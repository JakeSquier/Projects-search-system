"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zDataRequest = void 0;
const zod_1 = require("zod");
exports.zDataRequest = zod_1.z.object({
    ids: zod_1.z.string().transform((x) => x.split(','))
});
