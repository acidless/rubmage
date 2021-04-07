import { NextFunction, Request, Response } from 'express';

export type ControllerType = { [key: string]: RouteHandler };

/*====================*/

export type RouteHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => any;
