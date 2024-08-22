import express from "express";
import Cart from "../controllers/Cart.js";

const router = express.Router();

router.get("/", Cart.allCart);
router.post("/", Cart.addCart);
router.get("/:id", Cart.cartByUser);
router.put("/:id", Cart.updateCart);
router.delete("/:id", Cart.deleteCart);

export default router;
