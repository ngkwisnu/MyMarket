import express from "express";
import Orders from "../controllers/Orders.js";

const router = express.Router();

router.get("/", Orders.allOrder);
router.post("/", Orders.addOrder);
router.put("/:id", Orders.updateOrder);
router.delete("/:id", Orders.deleteOrder);
router.get("/:id", Orders.orderById);

export default router;
