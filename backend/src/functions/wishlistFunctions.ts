import serverless from "serverless-http";
import { setupExpressApp } from "../lib/setupExpressApp";
import { Router } from "express";
import { getUserWishlists } from "../lib/wishlist/getUserWishlists";
import { addWishlist } from "../lib/wishlist/addWishlist";
import { deleteWishlist } from "../lib/wishlist/deleteWishlist";
import { updateWishlist } from "../lib/wishlist/updateWishlist";

const app = setupExpressApp();
const wishlistBasePath = "/wishlist";
const wishlistRouter = Router();

// Get the users wishlists (Will always return an array)
wishlistRouter.get("/:userId", getUserWishlists);

// Will add a new wishlist
wishlistRouter.post("/", addWishlist);

// Will update a wishlist
wishlistRouter.put("/:wishlistId", updateWishlist);

// Will delete a wishlist
wishlistRouter.delete("/:wishlistId", deleteWishlist);

// Will add a member to a wishlist
// wishlistRouter.put("/addMember", addMemberToWishlist);

// Will remove a member from a wishlist
// wishlistRouter.put("/deleteMember", deleteMemberFromWishlist);

app.use(wishlistBasePath, wishlistRouter);

const serverlessApp = serverless(app);

export { serverlessApp as handler };
