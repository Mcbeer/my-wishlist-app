"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAccess = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var generateTokenAccess = function (userId) {
    return jsonwebtoken_1.sign({ userId: userId }, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
    });
};
exports.generateTokenAccess = generateTokenAccess;
