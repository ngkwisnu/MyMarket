import express from "express";
import Orders from "../controllers/Orders.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Orders.allOrder);
router.get("/user/", tokenVerify, Orders.orderByUser);
router.post("/", tokenVerify, Orders.addOrder);
router.put("/:id", tokenVerify, Orders.updateOrder);
router.delete("/:id", tokenVerify, Orders.deleteOrder);
router.get("/:id", tokenVerify, Orders.orderById);
router.get("/product/:id", tokenVerify, Orders.orderByProduct);
router.post("/data/midtrans", tokenVerify, Orders.insertTransaction);

export default router;
