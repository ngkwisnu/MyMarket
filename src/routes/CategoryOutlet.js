import express from "express";
import CategoryOutlet from "../controllers/CategoryOutlet.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, CategoryOutlet.allCategory);
router.post("/", tokenVerify, CategoryOutlet.addCategory);
router.put("/:id", tokenVerify, CategoryOutlet.updateCategory);
router.delete("/:id", tokenVerify, CategoryOutlet.deleteCategory);
router.get("/:id", tokenVerify, CategoryOutlet.categoryById);

export default router;
