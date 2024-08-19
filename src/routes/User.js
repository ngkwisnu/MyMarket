import User from "../controllers/User.js";
import express from "express";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 100);
    cb(null, file.fieldname + "-" + uniqueName + ".png");
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", tokenVerify, User.allUser);
router.post(
  "/",
  [tokenVerify, upload.single("image"), validateForm.validateFormUser],
  User.addUser
);
router.get("/:id", tokenVerify, User.userById);
router.put(
  "/:id",
  [tokenVerify, upload.single("image"), validateForm.validateFormUser],
  User.updateUser
);
router.delete("/:id", tokenVerify, User.deleteUser);

export default router;
