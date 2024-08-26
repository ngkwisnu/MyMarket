import express from "express";
import Outlet from "../controllers/Outlet.js";
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
  upload.single("outlet_name"),
  validateForm.validateFormOutlet,
];

router.get("/", tokenVerify, Outlet.allOutlet);
router.post("/", middleware, Outlet.addOutlet);
router.put("/:id", middleware, Outlet.updateOutlet);
router.get("/:id", tokenVerify, Outlet.outletById);
router.delete("/:id", tokenVerify, Outlet.deleteOutlet);

export default router;
