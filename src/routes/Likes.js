import express from "express";
import Likes from "../controllers/Likes.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormLike];

router.post("/", middleware, Likes.like);
router.get("/user/", tokenVerify, Likes.likeByUser);
router.get("/:id", tokenVerify, Likes.likeByProduct);
router.get("/:id/count", tokenVerify, Likes.countLikes);

export default router;
