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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlist = void 0;
var deleteWishlistEntry_1 = require("../../db/wishlist/deleteWishlistEntry");
var unbindWishlistFromUser_1 = require("../../db/wishlist/unbindWishlistFromUser");
var getRequesterId_1 = require("../../utils/getRequesterId");
var perhaps_1 = require("../../utils/perhaps");
var respond_1 = require("../../utils/respond");
var deleteWishlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wishlistId, requesterId, _a, unboundWishlistError, unboundStatus, _b, removeWishlistEntryError, wasDeleted;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                wishlistId = req.params.wishlistId || "";
                requesterId = getRequesterId_1.getRequesterId(req);
                return [4, perhaps_1.perhaps(unbindWishlistFromUser_1.unbindWishlistFromUser(wishlistId, requesterId))];
            case 1:
                _a = _c.sent(), unboundWishlistError = _a[0], unboundStatus = _a[1];
                if (unboundWishlistError) {
                    console.log(unboundWishlistError);
                    respond_1.respondError({
                        res: res,
                        statusCode: 500,
                        error: new Error("ERROR.WISHLIST_UNBOUND_ERROR"),
                    });
                    return [2];
                }
                if (!unboundStatus) {
                    console.log("Wishlist was not unbound, maybe the user id is not the owner of the wishlist?");
                    console.log(wishlistId, requesterId);
                    respond_1.respondError({
                        res: res,
                        statusCode: 500,
                        error: new Error("ERROR.WISHLIST_UNBOUND_ERROR"),
                    });
                    return [2];
                }
                return [4, perhaps_1.perhaps(deleteWishlistEntry_1.deleteWishlistEntry(wishlistId))];
            case 2:
                _b = _c.sent(), removeWishlistEntryError = _b[0], wasDeleted = _b[1];
                if (removeWishlistEntryError) {
                    console.log(removeWishlistEntryError);
                    respond_1.respondError({
                        res: res,
                        error: new Error("ERROR.WISHLIST_ENTRY_ERROR"),
                        statusCode: 500,
                    });
                    return [2];
                }
                if (!wasDeleted) {
                    respond_1.respondError({
                        res: res,
                        error: new Error("ERROR.WISHLIST_ENTRY_ERROR"),
                        statusCode: 500,
                    });
                    return [2];
                }
                respond_1.respondSuccess({
                    res: res,
                    data: wasDeleted,
                });
                return [2];
        }
    });
}); };
exports.deleteWishlist = deleteWishlist;
