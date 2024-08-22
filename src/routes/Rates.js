import express from "express";
import Rates from "../controllers/Rates.js";

const router = express.Router();

router.get("/", Rates.allRate);
router.post("/", Rates.addRate);
router.get("/:id", Rates.rateById);
router.put("/:id", Rates.updateRate);
router.delete("/:id", Rates.deleteRate);

export default router;
