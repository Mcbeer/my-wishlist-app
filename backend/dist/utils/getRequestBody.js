"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = void 0;
var getRequestBody = function (req) {
    var requestBody = req.body;
    if (typeof requestBody === "string") {
        return JSON.parse(requestBody);
    }
    else {
        return requestBody;
    }
};
exports.getRequestBody = getRequestBody;
