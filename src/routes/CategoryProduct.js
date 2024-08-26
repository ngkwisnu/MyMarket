import express from "express";
import CategoryProduct from "../controllers/CategoryProduct.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormCategoryProduct];

router.get("/", tokenVerify, CategoryProduct.allCategory);
router.post("/", middleware, CategoryProduct.addCategory);
router.put("/:id", middleware, CategoryProduct.updateCategory);
router.delete("/:id", tokenVerify, CategoryProduct.deleteCategory);
router.get("/:id", tokenVerify, CategoryProduct.categoryById);

export default router;
