"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zFacetsRequest = void 0;
const zod_1 = require("zod");
exports.zFacetsRequest = zod_1.z.object({
    dataTag: zod_1.z.enum(["all", "git"])
});
