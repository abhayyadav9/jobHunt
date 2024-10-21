import express from "express";
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated ,applyJob);
router.route("/get").get(isAuthenticated ,getAppliedJob);
router.route("/:id/applicants").post(isAuthenticated ,getApplicants);
router.route("/status/update/:id").post(isAuthenticated ,updateStatus);



export default router;