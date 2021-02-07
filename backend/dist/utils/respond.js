"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondError = exports.respondSuccess = void 0;
var IResponse_1 = require("../models/IResponse");
var respondSuccess = function (_a) {
    var res = _a.res, data = _a.data;
    res.send(formatSuccessResponse(data));
};
exports.respondSuccess = respondSuccess;
var respondError = function (_a) {
    var res = _a.res, error = _a.error, _b = _a.statusCode, statusCode = _b === void 0 ? 500 : _b;
    res.status(statusCode).send(formatErrorResponse(error, statusCode));
};
exports.respondError = respondError;
var formatErrorResponse = function (error, code, responseType) {
    if (responseType === void 0) { responseType = IResponse_1.ResponseType.ERROR; }
    return {
        responseType: responseType,
        type: typeof error,
        message: error.message,
        code: code,
        stacktrace: process.env.NODE_ENV === "production" ? "🥞" : error.stack || "",
    };
};
var formatSuccessResponse = function (data, responseType) {
    if (responseType === void 0) { responseType = IResponse_1.ResponseType.SUCCESS; }
    return {
        responseType: responseType,
        data: data,
    };
};
