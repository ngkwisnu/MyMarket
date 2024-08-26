import express from "express";
import Products from "../controllers/Products.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Products.allProduct);
router.post("/", tokenVerify, Products.addProduct);
router.put("/:id", tokenVerify, Products.updateProduct);
router.delete("/:id", tokenVerify, Products.deleteProduct);
router.get("/:id", tokenVerify, Products.productById);

export default router;
