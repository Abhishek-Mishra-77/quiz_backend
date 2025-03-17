import express from "express";
const router = express.Router();

import { createAssessment, updateAssessment, publishAssessment } from "../controllers/assessmentControllers.js";

router.post('/create', createAssessment);
router.put('/update/:id', updateAssessment);    
router.put('/publish/:id', publishAssessment);

export default router;