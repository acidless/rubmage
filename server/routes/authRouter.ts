import express from 'express';
import authController from '../controllers/authController';

/*====================*/

const authRouter = express.Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.logIn);

authRouter.post('/auth', authController.isAuth, authController.auth);

/*====================*/

export default authRouter;
