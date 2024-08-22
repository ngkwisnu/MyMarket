import express from "express";
import Transaction from "../controllers/Transaction.js";

const router = express.Router();

router.get("/", Transaction.allTransaction);
router.post("/", Transaction.addTransaction);
router.get("/:id", Transaction.transactionById);
router.put("/:id", Transaction.updateTransaction);
router.delete("/:id", Transaction.deleteTransaction);

export default router;
