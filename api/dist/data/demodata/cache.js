"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataCache = void 0;
const fetch_1 = require("./fetch");
class userDataCache {
    constructor(minutesToLive = 10) {
        this.millisecondsToLive = minutesToLive * 60 * 1000;
        this.cache = null;
        this.fetchDate = new Date(0);
        this.fetchFunc = fetch_1.fetchUserData;
    }
    /**
     * Returns current status of the cache
     * @returns {boolean}
     */
    isCacheValid() {
        return (this.fetchDate.getTime() + this.millisecondsToLive < new Date().getTime());
    }
    /**
     * Invalidates the current cache,
     * and triggers a cache rehydration
     */
    resetCache() {
        this.fetchDate = new Date(0);
    }
    getAllRecords() {
        if (!this.cache || this.isCacheValid()) {
            console.log('Cache is invalid. Rehydrating');
            return this.fetchFunc()
                .then((data) => {
                /** Populate cache */
                this.cache = data;
                /** Update fetch data */
                this.fetchDate = new Date();
                /** Return data (is equivelant to hydrated cache) */
                return data;
            })
                .catch((err) => {
                console.error(err);
                /** If an error ocurred signify by returning an empty arr */
                return [];
            });
        }
        else {
            console.log('Cache hit');
            return Promise.resolve(this.cache);
        }
    }
}
exports.userDataCache = userDataCache;
