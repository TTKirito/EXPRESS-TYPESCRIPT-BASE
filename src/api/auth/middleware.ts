import { NextFunction, Response } from "express";
import { OTP_KEY, ROLE } from "../../constants/common";
import errors from "../../constants/errors";
import { UserRole } from "../../database/models/userRole";
import BadRequestError from "../../exceptions/badRequestError";
import ForbiddenError from "../../exceptions/fobidenError";
import NotFoundError from "../../exceptions/notFoundError";
import Jwt from "../../services/Jwt";
import RedisProvider from "../../services/Redis";
import ac from "../../services/Role";
import BaseMiddleware from "../core/Middleware";
import TokenRepository from "../token/repository";
import AuthRepository from "./repository";
import { IAuthMiddleware } from "./types/interface/middleware";
import {
  TAuthMiddlewareRequestParameter,
  TInputAuthMiddlewareRequestParameter,
} from "./types/type/middleware";

declare namespace Express {
  export interface Request {
    currentUser?: string;
  }
}

export default class AuthMiddleware
  extends BaseMiddleware
  implements
    IAuthMiddleware<
      TAuthMiddlewareRequestParameter<TInputAuthMiddlewareRequestParameter>,
      Response,
      NextFunction
    >
{
  static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  protected jwt: Jwt;
  protected redis: RedisProvider;
  protected tokenRepository: TokenRepository;
  constructor() {
    super();
    this.repository = AuthRepository.getInstance();
    this.redis = RedisProvider.getInstance();
    this.tokenRepository = TokenRepository.getInstance();
    this.jwt = Jwt.getInstance();
  }

  async authorizeLoginWithPhone<
    I extends TAuthMiddlewareRequestParameter<TInputAuthMiddlewareRequestParameter>,
    RS extends Response<any, Record<string, any>>,
    NE extends NextFunction
  >(req: I, res: RS, next: NE): Promise<void> {
    return next();
  }

  async authorizeRefreshToken<
    I extends TAuthMiddlewareRequestParameter<TInputAuthMiddlewareRequestParameter>,
    RS extends Response<any, Record<string, any>>,
    NE extends NextFunction
  >(req: I, res: RS, next: NE): Promise<void> {
    const { refresh_token } = req.body;
    let token = await this.tokenRepository.getOne({
      clauses: { refresh_token },
      fields: ["id"],
      relationships: [],
    });

    if (!token) {
      throw new BadRequestError(errors.INVALID_REFRESH_TOKEN);
    }

    const detail = this.jwt.verify({ token: String(refresh_token) });

    if (!detail) {
      throw new BadRequestError(errors.INVALID_REFRESH_TOKEN);
    }

    return next();
  }

  async authorizeVerifyPhoneOtp<
    I extends TAuthMiddlewareRequestParameter<TInputAuthMiddlewareRequestParameter>,
    RS extends Response<any, Record<string, any>>,
    NE extends NextFunction
  >(req: I, res: RS, next: NE): Promise<void> {
    const { phone, otp } = req.body;
    let existedUser = await this.repository.getOne({
      clauses: { phone },
      fields: ["id"],
      relationships: ["roles"],
    });

    const key = `${OTP_KEY}:${existedUser.id}`;
    const data = JSON.parse(await this.redis.getKey({ key }));

    if (data && Number(data.otp) === Number(otp)) {
      return next();
    }

    throw new BadRequestError(errors.VALID_OTP_CODE);
  }

  defineRoutes(): void {
    this.routes = {
      loginWithPhone: "LoginWithPhone",
      verifyPhoneOtp: "VerifyPhoneOtp",
      refreshToken: "RefreshToken",
    };
  }
}
