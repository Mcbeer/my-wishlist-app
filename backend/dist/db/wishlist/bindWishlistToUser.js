"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindWishlistToUser = void 0;
var createDocumentClient_1 = require("../createDocumentClient");
var client = createDocumentClient_1.createDocumentClient();
var bindWishlistToUser = function (wishlistId, userId, listRole) {
    var params = {
        TableName: process.env.USERS_TABLE || "",
        Key: {
            userId: userId,
            wishlistId: "LIST#" + wishlistId,
        },
        UpdateExpression: "set listRole = :listRole",
        ExpressionAttributeValues: {
            ":listRole": listRole,
        },
        ReturnValues: "ALL_NEW",
    };
    return client
        .update(params)
        .promise()
        .then(function (result) { return result.Attributes; });
};
exports.bindWishlistToUser = bindWishlistToUser;
