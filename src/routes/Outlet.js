import express from "express";
import Outlet from "../controllers/Outlet.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import validateForm from "../middleware/validateForm.js";

const router = express.Router();
const middleware = [tokenVerify, validateForm.validateFormOutlet];

router.get("/", tokenVerify, Outlet.allOutlet);
router.post("/", middleware, Outlet.addOutlet);
router.put("/:id", middleware, Outlet.updateOutlet);
router.get("/:id", tokenVerify, Outlet.outletById);
router.delete("/:id", tokenVerify, Outlet.deleteOutlet);

export default router;
