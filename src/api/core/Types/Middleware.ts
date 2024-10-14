import { NextFunction, Request } from "express";

export type TIMiddleware = {
  Request: Request;
  Response: Response;
  next: NextFunction;
  handleAuthorization: object;
  checkRole: object;
};

type handleAuthorization = {
  str: string;
};

export type TMiddleware = {
  Request: Request;
  Response: Response;
  next: NextFunction;
  handleAuthorization: handleAuthorization;
  checkRole: { resource: string };
};
