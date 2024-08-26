import express from "express";
import Transaction from "../controllers/Transaction.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Transaction.allTransaction);
router.get("/user/", tokenVerify, Transaction.transactionByUser);
router.get("/:id", tokenVerify, Transaction.transactionById);
router.get("/product/:id", tokenVerify, Transaction.transactionByProduct);
router.get("/outlet/:id", tokenVerify, Transaction.transactionByOutlet);
router.delete("/:id", tokenVerify, Transaction.deleteTransaction);

export default router;
