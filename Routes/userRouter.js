import express, { Router } from "express";
import { getAllFollowers, getAllFollowing, getAlluser, getUser, updateUser, deleteUser, followUser, unfollowUser, getUsetbyUsername } from '../Controllers/userController.js'
import authMiddleWare from '../Middleware/authMiddleware.js'
const userRoute = express.Router();

userRoute.get('/alluser/:id', authMiddleWare, getAlluser)
userRoute.get('/followers/:id', authMiddleWare, getAllFollowers)
userRoute.get('/following/:id', authMiddleWare, getAllFollowing)
userRoute.get('/:id', authMiddleWare, getUser);
userRoute.get('/username/:username', getUsetbyUsername);
userRoute.put('/:id', authMiddleWare, updateUser);
userRoute.delete('/:id', authMiddleWare, deleteUser);
userRoute.put('/:id/follow', authMiddleWare, followUser);
userRoute.put('/:id/unfollow', authMiddleWare, unfollowUser);

export default userRoute;