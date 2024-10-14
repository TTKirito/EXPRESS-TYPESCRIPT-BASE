import { NextFunction, Response, Request } from "express";
import {
  TAuthMiddlewareParameter,
  TAuthMiddlewareRequestParameter,
} from "../type/middleware";


export interface IAuthMiddleware<
  T extends TAuthMiddlewareRequestParameter<TAuthMiddlewareParameter>,
  R extends Response,
  N extends NextFunction,
> {
  authorizeLoginWithPhone<I extends T, RS extends R, NE extends N>(
    req: I,
    res: RS,
    next: NE
  ): Promise<void>;
  authorizeVerifyPhoneOtp<I extends T, RS extends R, NE extends N>(
    req: I,
    res: RS,
    next: NE
  ): Promise<void>;

  authorizeRefreshToken<I extends T, RS extends R, NE extends N>(
    req: I,
    res: RS,
    next: NE
  ): Promise<void>;
}
