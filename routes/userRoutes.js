import express from "express";
const router = express.Router();

import { createUser, updateUser, removeUser, loginUser } from "../controllers/UserControllers.js";

// Create a new user
router.post('/create', createUser);

// Update user details
router.put('/update/:id', updateUser);

// Delete a user
router.delete('/delete/:id', removeUser);

// User login
router.post('/login', loginUser);

export default router;
