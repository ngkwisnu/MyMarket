import express from "express";
import CategoryProduct from "../controllers/CategoryProduct.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, CategoryProduct.allCategory);
router.post("/", tokenVerify, CategoryProduct.addCategory);
router.put("/:id", tokenVerify, CategoryProduct.updateCategory);
router.delete("/:id", tokenVerify, CategoryProduct.deleteCategory);
router.get("/:id", tokenVerify, CategoryProduct.categoryById);

export default router;
