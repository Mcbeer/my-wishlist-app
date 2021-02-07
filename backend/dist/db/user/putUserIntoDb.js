"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserIntoDb = void 0;
var createDocumentClient_1 = require("../createDocumentClient");
var client = createDocumentClient_1.createDocumentClient();
var putUserIntoDb = function (user, userId) {
    var params = {
        TableName: process.env.USERS_TABLE || "",
        Key: {
            userId: userId,
            wishlistId: "USER_INFO",
        },
        UpdateExpression: "set firstName = :firstName, lastName = :lastName, avatarUrl = :avatarUrl, email = :email, googleId = if_not_exists(googleId, :googleId)",
        ExpressionAttributeValues: {
            ":firstName": user.firstName,
            ":lastName": user.lastName,
            ":avatarUrl": user.avatarUrl,
            ":email": user.email,
            ":googleId": user.googleId,
        },
        ReturnValues: "ALL_NEW",
    };
    return client
        .update(params)
        .promise()
        .then(function (result) { return result.Attributes; });
};
exports.putUserIntoDb = putUserIntoDb;
