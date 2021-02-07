"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequesterId = void 0;
var getRequesterId = function (req) {
    var _a, _b;
    return ((_b = (_a = req === null || req === void 0 ? void 0 : req.requestContext) === null || _a === void 0 ? void 0 : _a.authorizer) === null || _b === void 0 ? void 0 : _b.principalId) || "";
};
exports.getRequesterId = getRequesterId;
