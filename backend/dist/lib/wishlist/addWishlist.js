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
exports.addWishlist = void 0;
var nanoid_1 = require("nanoid");
var bindWishlistToUser_1 = require("../../db/wishlist/bindWishlistToUser");
var putWishlistToDb_1 = require("../../db/wishlist/putWishlistToDb");
var IWishlist_1 = require("../../models/IWishlist");
var getRequesterId_1 = require("../../utils/getRequesterId");
var perhaps_1 = require("../../utils/perhaps");
var respond_1 = require("../../utils/respond");
var deleteWishlistEntry_1 = require("../../db/wishlist/deleteWishlistEntry");
var addWishlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wishlistData, requesterId, wishlistId, scrubbedData, _a, addWishlistError, wishlistObject, _b, boundToUserError, boundDetails, removeWishlistEntryError;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                wishlistData = req.body;
                requesterId = getRequesterId_1.getRequesterId(req);
                wishlistId = nanoid_1.nanoid(12);
                scrubbedData = __assign(__assign({}, wishlistData), { wishlistId: wishlistId });
                return [4, perhaps_1.perhaps(putWishlistToDb_1.putWishlistToDb(scrubbedData))];
            case 1:
                _a = _c.sent(), addWishlistError = _a[0], wishlistObject = _a[1];
                if (addWishlistError) {
                    console.log(addWishlistError);
                    respond_1.respondError({
                        res: res,
                        error: new Error("ERROR.ADD_WISHLIST_ERROR"),
                        statusCode: 500,
                    });
                    return [2];
                }
                return [4, perhaps_1.perhaps(bindWishlistToUser_1.bindWishlistToUser(wishlistId, requesterId, IWishlist_1.WishlistRoles.OWNER))];
            case 2:
                _b = _c.sent(), boundToUserError = _b[0], boundDetails = _b[1];
                if (!boundToUserError) return [3, 4];
                return [4, perhaps_1.perhaps(deleteWishlistEntry_1.deleteWishlistEntry(wishlistId))];
            case 3:
                removeWishlistEntryError = (_c.sent())[0];
                if (removeWishlistEntryError) {
                    console.log("Wishlist with ID: " + wishlistId + " was not removed properly, please fix this");
                    console.log(removeWishlistEntryError);
                }
                respond_1.respondError({
                    res: res,
                    error: new Error("ERROR.BIND_WISHLIST_ERROR"),
                    statusCode: 500,
                });
                return [2];
            case 4:
                respond_1.respondSuccess({
                    res: res,
                    data: __assign(__assign({}, wishlistObject), { listRole: boundDetails === null || boundDetails === void 0 ? void 0 : boundDetails.listRole }),
                });
                return [2];
        }
    });
}); };
exports.addWishlist = addWishlist;
