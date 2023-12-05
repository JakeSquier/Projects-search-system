"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zSearchRequest = void 0;
const zod_1 = require("zod");
exports.zSearchRequest = zod_1.z.object({
    term: zod_1.z.string(),
});
