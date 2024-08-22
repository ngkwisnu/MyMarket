import express from "express";
import GroupCategory from "../controllers/GroupCategory.js";

const router = express.Router();

router.get("/", GroupCategory.allGroup);
router.post("/", GroupCategory.addGroup);
router.get("/:id", GroupCategory.groupById);
router.put("/:id", GroupCategory.updateGroup);
router.delete("/:id", GroupCategory.deleteGroup);

export default router;
