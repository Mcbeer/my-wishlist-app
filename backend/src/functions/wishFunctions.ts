import serverless from "serverless-http";
import { setupExpressApp } from "../lib/setupExpressApp";
import { Router } from "express";
import { getWishById } from "../lib/wish/getWishById";
import { addWish } from "../lib/wish/addWish";
import { updateWish } from "../lib/wish/updateWish";
import { deleteWish } from "../lib/wish/deleteWish";

const app = setupExpressApp();
const wishBasePath = "/wish";
const wishRouter = Router();

// Will get wish by id
wishRouter.get("/:wishId", getWishById);

// will add a new wish
wishRouter.post("/", addWish);

// Will update a wish by it's id
wishRouter.put("/:wishId", updateWish);

// Will delete a wish
wishRouter.delete("/:wishId", deleteWish);

app.use(wishBasePath, wishRouter);

const serverlessApp = serverless(app);

export { serverlessApp as handler };
