import express from "express";
import Rates from "../controllers/Rates.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Rates.allRate);
router.post("/", tokenVerify, Rates.addRate);
router.get("/:id", tokenVerify, Rates.rateById);
router.put("/:id", tokenVerify, Rates.updateRate);
router.delete("/:id", tokenVerify, Rates.deleteRate);

export default router;
