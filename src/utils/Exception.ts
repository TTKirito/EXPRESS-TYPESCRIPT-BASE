import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/user";
import Jwt from "../services/Jwt";
import { HanderReturn } from "./Handler";

const errors = HanderReturn.getInstance();
const jwt = Jwt.getInstance();

export const asyncException = (cb: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      return errors.handleExceptionResponse({
        res,
        status: error.code,
        error: error.message,
      });
    }
  };
};

type UserPayload = Partial<User>

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next();
  }

  const payload = jwt.verify({ token }) as User;
  req.currentUser = payload;
  next();
};
