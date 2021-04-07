import express from 'express';
import handlerError from './utils/errorHandler';
import cors from 'cors';

import authRouter from './routes/authRouter';
import dialogRouter from './routes/dialogRouter';
import messageRouter from './routes/messageRouter';

import AppError from './utils/AppError';
import cookieParser from 'cookie-parser';

/*====================*/

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

/*====================*/

const APIRouter = express.Router();

app.use('/api', APIRouter);
APIRouter.use('/auth', authRouter);
APIRouter.use('/dialogs', dialogRouter);
APIRouter.use('/messages', messageRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server.`));
});

app.use(handlerError);

/*====================*/

export default app;
