import express from "express";
import Likes from "../controllers/Likes.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.post("/", tokenVerify, Likes.like);
router.get("/user/", tokenVerify, Likes.likeByUser);
router.get("/:id", tokenVerify, Likes.likeByProduct);
router.get("/:id/count", tokenVerify, Likes.countLikes);

export default router;
