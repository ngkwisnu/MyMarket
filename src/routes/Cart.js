import express from "express";
import Cart from "../controllers/Cart.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormCart];

router.get("/", tokenVerify, Cart.allCart);
router.post("/", tokenVerify, Cart.addItemToCart);
router.get("/:id", tokenVerify, Cart.cartByUser);
router.get("/product/:id", tokenVerify, Cart.findProductInCart);
router.put("/:id", middleware, Cart.updateCart);

export default router;
