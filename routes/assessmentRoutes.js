import express from "express";
const router = express.Router();

import { createAssessment, updateAssessment, publishAssessment , getAllAssessments } from "../controllers/assessmentControllers.js";

router.post('/create', createAssessment);
router.put('/update/:id', updateAssessment);    
router.put('/publish/:id', publishAssessment);
router.get('/get', getAllAssessments);

export default router;