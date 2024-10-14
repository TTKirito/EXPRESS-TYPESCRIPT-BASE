import { Response } from "express";
import { User } from "../../database/models/user";
import Controller from "../core/Controller";
import AuthService from "./service";
import { IAuth } from "./types/interface/controller";
import {
  TInputRequestParameter,
  TRequestParameter,
} from "./types/type/controller";

export default class AuthController
  extends Controller<Partial<User>>
  implements IAuth<TRequestParameter<TInputRequestParameter>, Response>
{
  static instance: AuthController;

  static getInstance() {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  service = AuthService.getInstance();

  constructor() {
    super();
  }

  async login<I extends TRequestParameter<TInputRequestParameter>>(
    payload: I,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    const { email, password } = payload.body;
    const result = await this.service.login({
      email: String(email),
      password: String(password),
    });
    return this.errorHander.handleReturnResponse({
      status: 200,
      res: response,
      result,
    });
  }

  async loginWithPhone<I extends TRequestParameter<TInputRequestParameter>>(
    payload: I,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    const { phone } = payload.body;
    const result = await this.service.loginWithPhone({ phone: String(phone) });
    return this.errorHander.handleReturnResponse({
      status: 200,
      res: response,
      result,
    });
  }

  async refreshToken<I extends TRequestParameter<TInputRequestParameter>>(
    payload: I,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    const { refresh_token } = payload.body;
    const result = await this.service.refreshToken({
      refreshToken: String(refresh_token),
    });
    return this.errorHander.handleReturnResponse({
      status: 200,
      res: response,
      result,
    });
  }

  async verifyPhoneOtp<I extends TRequestParameter<TInputRequestParameter>>(
    payload: I,
    response: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    const { phone } = payload.body;
    const result = await this.service.verifyPhoneOTP({ phone: String(phone) });
    return this.errorHander.handleReturnResponse({
      status: 200,
      res: response,
      result,
    });
  }
}
