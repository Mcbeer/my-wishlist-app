"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var validateToken = function (token) {
    var verifiedToken = jsonwebtoken_1.verify(token, process.env.JWT_SECRET || "");
    if (!verifiedToken) {
        return null;
    }
    return verifiedToken;
};
exports.validateToken = validateToken;
