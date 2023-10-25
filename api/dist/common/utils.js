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
exports.fetchUtil = void 0;
function fetchUtil(url, method, body = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reqObject = method != 'GET'
                ? {
                    method,
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                }
                : {};
            const response = yield fetch(url, reqObject);
            const data = yield response.json();
            return data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.fetchUtil = fetchUtil;