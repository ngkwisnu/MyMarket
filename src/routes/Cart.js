import express from "express";
import Cart from "../controllers/Cart.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Cart.allCart);
router.post("/", tokenVerify, Cart.addItemToCart);
router.get("/:id", tokenVerify, Cart.cartByUser);
router.get("/product/:id", tokenVerify, Cart.findProductInCart);
router.put("/:id", tokenVerify, Cart.updateCart);

export default router;
