import express from "express";
import Products from "../controllers/Products.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, file.fieldname + "-" + name);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();
const middleware = [
  tokenVerify,
  upload.single("product_image"),
  validateForm.validateFormProduct,
];

router.get("/", tokenVerify, Products.allProduct);
router.post("/", middleware, Products.addProduct);
router.put("/:id", middleware, Products.updateProduct);
router.delete("/:id", tokenVerify, Products.deleteProduct);
router.get("/:id", tokenVerify, Products.productById);

export default router;
