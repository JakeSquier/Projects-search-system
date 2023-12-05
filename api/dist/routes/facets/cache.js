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
exports.getFacets = void 0;
const moize_1 = __importDefault(require("moize"));
const cache_1 = require("../../data/demodata/cache");
const mathjs_1 = require("mathjs");
exports.getFacets = moize_1.default.promise(() => __awaiter(void 0, void 0, void 0, function* () {
    const allEntries = yield (new cache_1.userDataCache()).getAllRecords();
    // TODO - Move this into an index definition
    const facets = {
        "id": [],
        "name": [],
        "fullName": [],
        "repoUrl": [],
        "repoSize": [],
        "primaryLanguage": [],
    };
    let entry;
    for (entry of allEntries) {
        for (const [key, value] of Object.entries(entry)) {
            if (value &&
                facets[key] &&
                !facets[key].includes(value)) {
                console.log(value);
                facets[key].push(value);
            }
        }
    }
    return facets;
}), {
    maxAge: (0, mathjs_1.unit)(15, "minutes").toNumber("ms")
});
