import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { generateSlip, updateSlip, getMySlips, getAllSlips } from "../controller/salarySlipController.js";

const router = express.Router();

router.post("/sal", authUser, authAdmin, generateSlip);
router.put("/:id", authUser, authAdmin, updateSlip);
router.get("/me", authUser, getMySlips);
router.get("/all", authUser, authAdmin, getAllSlips);

export default router;
