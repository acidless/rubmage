import express from 'express';
import authController from '../controllers/authController';
import dialogController from '../controllers/dialogController';
import messageController from '../controllers/messageController';

/*====================*/

const dialogRouter = express.Router();

dialogRouter.route('/').get(authController.isAuth, dialogController.getAllDialogs);

dialogRouter.route('/:dialogId').get(authController.isAuth, dialogController.getDialog);

dialogRouter.route('/:dialogId/messages').get(authController.isAuth, messageController.getMessagesFromDialog);

/*====================*/

export default dialogRouter;
