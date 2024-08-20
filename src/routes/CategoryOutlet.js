import express from "express";
import CategoryOutlet from "../controllers/CategoryOutlet.js";

const router = express.Router();

router.get("/", CategoryOutlet.allCategory);
router.post("/", CategoryOutlet.addCategory);
router.put("/:id", CategoryOutlet.updateCategory);
router.delete("/:id", CategoryOutlet.deleteCategory);
router.get("/:id", CategoryOutlet.categoryById);

export default router;
