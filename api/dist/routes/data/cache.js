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
exports.fetchEntryById = void 0;
const moize_1 = __importDefault(require("moize"));
const cache_1 = require("../../data/demodata/cache");
const mathjs_1 = require("mathjs");
exports.fetchEntryById = moize_1.default.promise((id) => __awaiter(void 0, void 0, void 0, function* () {
    const allEntries = yield new cache_1.userDataCache().getAllRecords();
    let entry;
    for (entry of allEntries) {
        if (entry.id.toString() === id) {
            return entry;
        }
    }
    // If no matching entries were found return null
    return null;
}), {
    maxSize: 1000,
    maxAge: (0, mathjs_1.unit)(15, 'minutes').toNumber('ms'),
});
