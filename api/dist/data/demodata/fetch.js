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
exports.fetchUserData = void 0;
const utils_1 = require("../../common/utils");
/**
 * TEMP - This is a temporary implementation of data ingress
 *
 * In this file we fetch all user git repos. Once fetched we
 * then format the data and cache it. This will be refactored
 * once the sql server is made along with its fetch process.
 */
function fetchUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        const gitUser = process.env.GIT_USER_NAME || 'JakeSquier';
        const gitApiUrl = `https://api.github.com/users/${gitUser}/repos`;
        const unsanitizedData = yield (0, utils_1.fetchUtil)(gitApiUrl, 'GET');
        //@ts-ignore
        const sanitizedData = unsanitizedData.map((repo) => {
            return {
                //@ts-ignore
                id: repo.id,
                //@ts-ignore
                name: repo.name,
                //@ts-ignore
                fullName: repo.full_name,
                //@ts-ignore
                ownerUserName: repo.owner.login,
                //@ts-ignore
                ownerId: repo.owner.id,
                //@ts-ignore
                ownerAvatar: repo.owner.avatar_url,
                //@ts-ignore
                ownerUrl: repo.owner.url,
                //@ts-ignore
                description: repo.description,
                //@ts-ignore
                repoUrl: repo.url,
                //@ts-ignore
                repoSize: repo.size,
                //@ts-ignore
                primaryLanguage: repo.language ? repo.language : null,
            };
        });
        return sanitizedData;
    });
}
exports.fetchUserData = fetchUserData;
