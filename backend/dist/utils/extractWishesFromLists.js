"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractWishesFromLists = void 0;
var formatWish_1 = require("./formatWish");
var extractWishesFromLists = function (queriedData) {
    var wishlist = queriedData.find(function (x) { return x.wishId === "WISHLIST"; });
    var wishes = queriedData.filter(function (x) { return x.wishId !== "WISHLIST"; });
    var formattedWishes = wishes.map(formatWish_1.formatWish);
    return __assign(__assign({}, wishlist), { wishes: wishes });
};
exports.extractWishesFromLists = extractWishesFromLists;
