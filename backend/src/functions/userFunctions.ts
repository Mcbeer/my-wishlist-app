import serverless from "serverless-http";
import { setupExpressApp } from "../lib/setupExpressApp";
import { Router } from "express";
import { getUserSelf } from "../lib/user/getUserSelf";
import { getUserById } from "../lib/user/getUserById";
import { authorizeUser } from "../lib/user/authorizeUser";

const app = setupExpressApp();
const userBasePath = "/user";
const userRouter = Router();

userRouter.get("/me", getUserSelf);

userRouter.get("/:userId", getUserById);

// Authorize user will also authorize new users, as in create user
userRouter.post("/authorize", authorizeUser);

app.use(userBasePath, userRouter);

console.log("Hello from userFunctions");

const serverlessApp = serverless(app);

export { serverlessApp as handler };
