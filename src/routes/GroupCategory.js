import express from "express";
import GroupCategory from "../controllers/GroupCategory.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormGroup];

router.get("/", tokenVerify, GroupCategory.allGroup);
router.post("/", middleware, GroupCategory.addGroup);
router.get("/:id", tokenVerify, GroupCategory.groupById);
router.put("/:id", middleware, GroupCategory.updateGroup);
router.delete("/:id", tokenVerify, GroupCategory.deleteGroup);

export default router;
