import express from "express";
import Favorites from "../controllers/Favorites.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormFavorite];

router.post("/", middleware, Favorites.favorite);
router.get("/user/", tokenVerify, Favorites.favoriteByUser);
router.get("/:id", tokenVerify, Favorites.favoriteByProduct);
router.get("/:id/count", tokenVerify, Favorites.countFavorite);

export default router;
