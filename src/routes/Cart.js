import express from "express";
import Cart from "../controllers/Cart.js";

const router = express.Router();

router.get("/", Cart.allCart);
router.post("/", Cart.addItemToCart);
router.get("/:id", Cart.cartByUser);
router.get("/product/:id", Cart.findProductInCart);
router.put("/:id", Cart.updateCart);

export default router;
