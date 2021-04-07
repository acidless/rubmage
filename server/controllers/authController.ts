import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import JSendSerializer from '../utils/JSend/JSendSerializer';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import User from '../models/User/UserModel';
const { promisify } = require('util');

/*====================*/

const authController = {
  _setJWTResponse(user: any, statusCode: number, res: Response) {
    const token = jwt.sign({ id: user._id, password: user.password }, 'rubtid228', {
      expiresIn: '30d',
    });

    user.password = undefined;

    res.status(statusCode).json(JSendSerializer.serialize(true, { user, token }));
  },

  register: catchAsync(async (req, res, next) => {
    const { login, email, password } = req.body;

    if (!login || !password || !email) {
      return next!(new AppError(401, 'Вы должны указать все данные.'));
    }

    const newUser = await User.create({ login, email, password });

    authController._setJWTResponse(newUser, 200, res);
  }),

  logIn: catchAsync(async (req, res, next) => {
    const user = await User.findOne({ login: req.body.login }).select('+password');

    if (!user || !(await user.comparePasswords(req.body.password, user.password))) {
      return next!(new AppError(401, 'Неверный логин или пароль.'));
    }

    authController._setJWTResponse(user, 200, res);
  }),

  isAuth: catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];
      if (!token) {
        return next!(new AppError(401, 'Вы не вошли в аккаунт.'));
      }

      const decoded = await promisify(jwt.verify)(token, 'rubtid228');

      const freshUser = await User.findById({ _id: decoded.id, password: decoded.password });
      if (!freshUser) {
        return next!(new AppError(401, 'Пользователь с этим токеном не существует.'));
      }

      req.currentUser = freshUser;
      return next!();
    }
    return next!(new AppError(401, 'Вы не вошли в аккаунт.'));
  }),

  auth: catchAsync(async (req, res, next) => {
    return res.status(200).json(JSendSerializer.serialize(true, req.currentUser));
  }),
};

/*====================*/

export default authController;
