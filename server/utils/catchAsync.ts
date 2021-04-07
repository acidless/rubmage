import { RouteHandler } from '../types/ControllerType';
import { NextFunction, Request, Response } from 'express';

export default function catchAsync(fn: RouteHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}
