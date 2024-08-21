import express from "express";
import Products from "../controllers/Products.js";

const router = express.Router();

router.get("/", Products.allProduct);
router.post("/", Products.addProduct);
router.put("/:id", Products.updateProduct);
router.delete("/:id", Products.deleteProduct);
router.get("/:id", Products.productById);

export default router;
