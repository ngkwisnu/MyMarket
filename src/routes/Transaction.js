import express from "express";
import Transaction from "../controllers/Transaction.js";

const router = express.Router();

router.get("/", Transaction.allTransaction);
router.get("/user/", Transaction.transactionByUser);
router.post("/", Transaction.addTransaction);
router.get("/:id", Transaction.transactionById);
router.get("/product/:id", Transaction.transactionByProduct);
router.put("/:id", Transaction.updateTransaction);
router.delete("/:id", Transaction.deleteTransaction);

export default router;
