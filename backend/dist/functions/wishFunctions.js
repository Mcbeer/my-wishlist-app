"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var serverless_http_1 = __importDefault(require("serverless-http"));
var setupExpressApp_1 = require("../lib/setupExpressApp");
var express_1 = require("express");
var getWishById_1 = require("../lib/wish/getWishById");
var addWish_1 = require("../lib/wish/addWish");
var updateWish_1 = require("../lib/wish/updateWish");
var deleteWish_1 = require("../lib/wish/deleteWish");
var app = setupExpressApp_1.setupExpressApp();
var wishBasePath = "/wish";
var wishRouter = express_1.Router();
wishRouter.get("/:wishId", getWishById_1.getWishById);
wishRouter.post("/", addWish_1.addWish);
wishRouter.put("/:wishId", updateWish_1.updateWish);
wishRouter.delete("/:wishId", deleteWish_1.deleteWish);
app.use(wishBasePath, wishRouter);
var serverlessApp = serverless_http_1.default(app);
exports.handler = serverlessApp;