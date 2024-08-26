import express from "express";
import Rates from "../controllers/Rates.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormRate];

router.get("/", tokenVerify, Rates.allRate);
router.post("/", middleware, Rates.addRate);
router.get("/:id", tokenVerify, Rates.rateById);
router.put("/:id", middleware, Rates.updateRate);
router.delete("/:id", tokenVerify, Rates.deleteRate);

export default router;
