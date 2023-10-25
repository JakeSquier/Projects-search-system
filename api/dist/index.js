"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cache_1 = require("./data/demodata/cache");
//import { Project } from './data/demodata/types'
dotenv_1.default.config();
const router = (0, express_1.default)();
const port = process.env.PORT || 8080;
const cache = new cache_1.userDataCache();
router.get('/', (req, res) => {
    cache
        .getAllRecords()
        .then(result => {
        res.send(JSON.stringify(result));
    })
        .catch(err => {
        res.send(err);
    });
});
router.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
