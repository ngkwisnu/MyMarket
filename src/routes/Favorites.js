import express from "express";
import Favorites from "../controllers/Favorites.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.post("/", tokenVerify, Favorites.favorite);
router.get("/user/", tokenVerify, Favorites.favoriteByUser);
router.get("/:id", tokenVerify, Favorites.favoriteByProduct);
router.get("/:id/count", tokenVerify, Favorites.countFavorite);

export default router;
