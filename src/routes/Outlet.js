import express from "express";
import Outlet from "../controllers/Outlet.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = express.Router();

router.get("/", tokenVerify, Outlet.allOutlet);
router.post("/", tokenVerify, Outlet.addOutlet);
router.put("/:id", tokenVerify, Outlet.updateOutlet);
router.get("/:id", tokenVerify, Outlet.outletById);
router.delete("/:id", tokenVerify, Outlet.deleteOutlet);

export default router;
