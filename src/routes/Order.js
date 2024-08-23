import express from "express";
import Orders from "../controllers/Orders.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", Orders.allOrder);
router.get("/user/", Orders.orderByUser);
router.post("/", tokenVerify, Orders.addOrder);
router.put("/:id", Orders.updateOrder);
router.delete("/:id", Orders.deleteOrder);
router.get("/:id", Orders.orderById);
router.get("/product/:id", Orders.orderByProduct);
router.post("/payment/:id", tokenVerify, Orders.checkout);
router.post("/data/midtrans", Orders.dataMidtrans);

export default router;
