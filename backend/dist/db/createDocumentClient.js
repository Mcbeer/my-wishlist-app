"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentClient = void 0;
var dynamodb_1 = require("aws-sdk/clients/dynamodb");
var createDocumentClient = function () {
    var client = new dynamodb_1.DocumentClient({ convertEmptyValues: true });
    return client;
};
exports.createDocumentClient = createDocumentClient;
