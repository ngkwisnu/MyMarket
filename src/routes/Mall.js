import express from "express";
import Mall from "../controllers/Mall.js";

const router = express.Router();

router.get("/", Mall.allMall);

export default router;
