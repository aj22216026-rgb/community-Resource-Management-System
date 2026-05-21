import express from 'express';
import { createUser, loginUser,getAllUsers,getUserInfo} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router=express.Router();

// http://localhost:3000/users/create
router.post('/create', createUser);

// http://localhost:5000/users/login
router.post('/login', loginUser);

//http://localhost:3000/users/get_users
router.get('/get_users', getAllUsers);

// http://localhost:5000/users/profile
router.get('/profile', verifyToken, getUserInfo);

export { router as userRouter };