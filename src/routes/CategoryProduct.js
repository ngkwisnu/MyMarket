import express from "express";
import CategoryProduct from "../controllers/CategoryProduct.js";

const router = express.Router();

router.get("/", CategoryProduct.allCategory);
router.post("/", CategoryProduct.addCategory);
router.put("/:id", CategoryProduct.updateCategory);
router.delete("/:id", CategoryProduct.deleteCategory);
router.get("/:id", CategoryProduct.categoryById);

export default router;
