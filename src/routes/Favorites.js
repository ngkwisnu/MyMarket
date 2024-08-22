import express from "express";
import Favorites from "../controllers/Favorites.js";

const router = express.Router();

router.post("/", Favorites.favorite);
router.get("/user/", Favorites.favoriteByUser);
router.get("/:id", Favorites.favoriteByProduct);
router.get("/:id/count", Favorites.countFavorite);

export default router;
