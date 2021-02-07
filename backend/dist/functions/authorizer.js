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
exports.handler = void 0;
var getUserFromDbById_1 = require("../db/user/getUserFromDbById");
var generatePolicy_1 = require("../lib/authorization/generatePolicy");
var validateToken_1 = require("../lib/authorization/validateToken");
var perhaps_1 = require("../utils/perhaps");
var authorizer = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var type, token, validatedToken, _a, userError, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                type = event.type;
                if (!(type === "TOKEN")) return [3, 2];
                token = event.authorizationToken;
                validatedToken = validateToken_1.validateToken(token);
                console.log("Validated token...", validatedToken);
                if (!validatedToken) {
                    return [2, generatePolicy_1.generatePolicy({
                            principalId: "",
                            effect: generatePolicy_1.AuthorizationEffect.DENY,
                            resource: event.methodArn,
                        })];
                }
                return [4, perhaps_1.perhaps(getUserFromDbById_1.getUserFromDbById(validatedToken.userId))];
            case 1:
                _a = _b.sent(), userError = _a[0], user = _a[1];
                if (userError) {
                    console.log("Could not get user from db");
                    console.log(userError);
                    return [2, generatePolicy_1.generatePolicy({
                            principalId: "",
                            effect: generatePolicy_1.AuthorizationEffect.DENY,
                            resource: event.methodArn,
                        })];
                }
                if (!user) {
                    console.log("There is no user like that...");
                    return [2, generatePolicy_1.generatePolicy({
                            principalId: "",
                            effect: generatePolicy_1.AuthorizationEffect.DENY,
                            resource: event.methodArn,
                        })];
                }
                console.log("User is all good", user);
                return [2, generatePolicy_1.generatePolicy({
                        principalId: user.userId,
                        effect: generatePolicy_1.AuthorizationEffect.ALLOW,
                        resource: event.methodArn,
                    })];
            case 2: return [2];
        }
    });
}); };
exports.handler = authorizer;
