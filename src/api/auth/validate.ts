import { check } from "express-validator";
import Validate from "../core/Validate";

export default class AuthValidate extends Validate {
  static instance: AuthValidate;

  static getInstance() {
    if (!AuthValidate.instance) {
      AuthValidate.instance = new AuthValidate();
    }
    return AuthValidate.instance;
  }

  constructor() {
    super();
  }

  payloadLogin(): any[] {
    return [
      check("email").isString(),
      check("password").isString(),
      this.validate,
    ];
  }

  payloadLoginWithPhone(): any[] {
    return [check("phone").isString(), this.validate];
  }

  payloadRefreshToken(): any[] {
    return [check("refresh_token").isString(), this.validate];
  }

  payloadVerifyPhoneOtp(): any[] {
    return [check("phone").isString(), check("otp").isNumeric(), this.validate];
  }
}
