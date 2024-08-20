import express from "express";
import Outlet from "../controllers/Outlet.js";

const router = express.Router();

router.get("/", Outlet.allOutlet);
router.post("/", Outlet.addOutlet);
router.put("/:id", Outlet.updateOutlet);
router.get("/:id", Outlet.outletById);
router.delete("/:id", Outlet.deleteOutlet);

export default router;
