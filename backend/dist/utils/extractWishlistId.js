"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWishlistId = void 0;
var extractWishlistId = function (wishlistId) {
    return wishlistId.split("#")[1];
};
exports.extractWishlistId = extractWishlistId;
