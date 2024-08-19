import express from "express";
import Auth from "../controllers/Auth.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();

router.post("/register", validateForm.validateFormRegister, Auth.register);
router.post("/login", validateForm.validateFormLogin, Auth.login);
router.get("/token", Auth.refreshToken);
router.delete("/logout", Auth.logout);

export default router;
