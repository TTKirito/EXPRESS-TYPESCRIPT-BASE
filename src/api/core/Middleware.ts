import { NextFunction, Request, Response } from "express";
import errors from "../../constants/errors";
import { User } from "../../database/models/user";
import ForbiddenError from "../../exceptions/fobidenError";
import ac from "../../services/Role";
import { HanderReturn } from "../../utils/Handler";
import AuthRepository from "../auth/repository";
import { IMiddleware } from "./Interfaces/Middleware";
import { TMiddleware } from "./Types/Middleware";

const err = HanderReturn.getInstance();

export default abstract class BaseMiddleware
  implements IMiddleware<TMiddleware>
{
  public repository: any;
  public routes: any;

  constructor() {
    this.defineRoutes();
  }

  checkRole<I extends { resource: string }>({ resource }: I) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req?.currentUser?.id;

        if (id) {
          const user = await User.findOne({
            where: {
              id
            },
            select: ['id'],
            relations: ['roles']
          })

          if (!user) {
            throw new ForbiddenError();
          }

          if (!user.roles || user.roles && !user.roles.length) {
            throw new ForbiddenError();
          }

          if (user.roles && user.roles.length) {
            for (let role of user.roles) {
              const ace = ac.can(role.name).createOwn(this.routes[resource]);

              if (!ace.granted) {
                throw new ForbiddenError();
              }
            }
          }
        }

        return next()
      } catch (e) {
        return err.handleExceptionResponse({
          status: e.code || 403,
          res: res,
          error: e.message || errors.FORBIDDEN,
        });
      }
    };
  }

  defineRoutes(): void {
    this.routes = [];
  }

  handleAuthorization<I extends { str: string }>({ str }: I) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let method = this.routes[str];
        method = this[`authorize${method}`];

        if (!method) return next();

        return await method.bind(this)(req, res, next);
      } catch (e) {
        return err.handleExceptionResponse({
          status: e.code || 401,
          res: res,
          error: e.message || errors.NOT_AUTHORIZED,
        });
      }
    };
  }
}
