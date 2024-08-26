import express from "express";
import Products from "../controllers/Products.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormProduct];

router.get("/", tokenVerify, Products.allProduct);
router.post("/", middleware, Products.addProduct);
router.put("/:id", middleware, Products.updateProduct);
router.delete("/:id", tokenVerify, Products.deleteProduct);
router.get("/:id", tokenVerify, Products.productById);

export default router;
