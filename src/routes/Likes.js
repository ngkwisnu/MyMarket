import express from "express";
import Likes from "../controllers/Likes.js";

const router = express.Router();

router.post("/", Likes.like);
router.get("/user/", Likes.likeByUser);
router.get("/:id", Likes.likeByProduct);
router.get("/:id/count", Likes.countLikes);

export default router;
