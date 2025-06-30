import express from 'express';
import { getone, saveUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register",saveUser);
userRouter.post("/login",getone);

export default userRouter;