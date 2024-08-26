import express from "express";
import CategoryOutlet from "../controllers/CategoryOutlet.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormCategoryOutlet];

router.get("/", tokenVerify, CategoryOutlet.allCategory);
router.post("/", middleware, CategoryOutlet.addCategory);
router.put("/:id", middleware, CategoryOutlet.updateCategory);
router.delete("/:id", tokenVerify, CategoryOutlet.deleteCategory);
router.get("/:id", tokenVerify, CategoryOutlet.categoryById);

export default router;
