import express from "express";
import GroupCategory from "../controllers/GroupCategory.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, GroupCategory.allGroup);
router.post("/", tokenVerify, GroupCategory.addGroup);
router.get("/:id", tokenVerify, GroupCategory.groupById);
router.put("/:id", tokenVerify, GroupCategory.updateGroup);
router.delete("/:id", tokenVerify, GroupCategory.deleteGroup);

export default router;
