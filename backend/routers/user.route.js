import express from 'express';
import { createUser, loginUser,getAllUsers,getUserInfo,deleteUser,updateUserRole,updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import multer from '../config/multer.js';

const router=express.Router();

// http://localhost:3000/users/create
router.post('/create', multer.single('profile_pic'), createUser);

// http://localhost:5000/users/login
router.post('/login', loginUser);

//http://localhost:3000/users/get_users
router.get('/get_users', getAllUsers);

// http://localhost:5000/users/profile
router.get('/profile', verifyToken, getUserInfo);

// http://localhost:5000/users/update_role/:id
router.put('/update_role/:id', verifyToken, updateUserRole);

// http://localhost:5000/users/delete_user/:id
router.delete('/delete_user/:id', verifyToken, deleteUser);

// http://localhost:5000/users/update_user/:id
router.put('/update_user/:id', verifyToken, multer.single('profile_pic'), updateUser);

export { router as userRouter };