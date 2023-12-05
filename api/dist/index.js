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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cache_1 = require("./data/demodata/cache");
const data_1 = require("./routes/data");
const search_1 = require("./routes/search");
const facets_1 = require("./routes/facets");
//import { Project } from './data/demodata/types'
dotenv_1.default.config();
const router = (0, express_1.default)();
const port = process.env.PORT || 8080;
const cache = new cache_1.userDataCache();
// router.get('/', (req: Request, res: Response) => {
//   cache
//     .getAllRecords()
//     .then(result => {
//       res.send(JSON.stringify(result))
//     })
//     .catch(err => {
//       res.send(err)
//     })
// })
// router.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
// })
init();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const router = (0, express_1.default)();
            const port = process.env.PORT || 8080;
            // Initialize user's git cache
            const cache = new cache_1.userDataCache();
            // Activate search endpoint
            (0, search_1.enableSearchEndpoint)(router);
            // Activate data endpoint
            (0, data_1.enableDataEndpoint)(router);
            // Activate facets endpoint
            (0, facets_1.enableFacetsEndpoint)(router);
            // Health check endpoint
            router.use("/", (req, res, next) => {
                cache
                    .getAllRecords()
                    .then(result => {
                    res.send(result);
                })
                    .catch(err => {
                    res.send(err);
                });
            });
            router.listen(port, () => {
                console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
            });
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.init = init;
