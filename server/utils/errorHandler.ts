import { NextFunction, Request, Response } from 'express';

/*====================*/

export default function handlerError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.status || 500;
  res.status(err.statusCode).json({ success: false, message: err.message });
}
