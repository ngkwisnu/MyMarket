import express from "express";
import Transaction from "../controllers/Transaction.js";

const router = express.Router();

router.get("/", Transaction.allTransaction);
router.get("/user/", Transaction.transactionByUser);
router.get("/:id", Transaction.transactionById);
router.get("/product/:id", Transaction.transactionByProduct);
router.get("/outlet/:id", Transaction.transactionByOutlet);
router.delete("/:id", Transaction.deleteTransaction);

export default router;
