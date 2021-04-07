import express from 'express';
import messageController from '../controllers/messageController';
import authController from '../controllers/authController';

/*====================*/

const messageRouter = express.Router();

messageRouter.route('/').post(authController.isAuth, messageController.sendMessage);

/*====================*/

export default messageRouter;
