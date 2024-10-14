import express from "express";
import AuthController from "./controller";
import AuthMiddleware from "./middleware";
import AuthValidate from "./validate";

const authRouter = express.Router();

const authController = AuthController.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const authValidate = AuthValidate.getInstance();

authRouter.post(
  "/login/phone",
  authValidate.payloadLoginWithPhone(),
  authMiddleware.checkRole({ resource: "loginWithPhone" }),
  authMiddleware.handleAuthorization({ str: "loginWithPhone" }),
  authController.callMethod("loginWithPhone")
);

authRouter.post(
  "/login/phone/verify",
  authValidate.payloadVerifyPhoneOtp(),
  authMiddleware.checkRole({ resource: "verifyPhoneOtp" }),
  authMiddleware.handleAuthorization({ str: "verifyPhoneOtp" }),
  authController.callMethod("verifyPhoneOtp")
);

authRouter.post(
  "/refresh",
  authValidate.payloadRefreshToken(),
  authMiddleware.handleAuthorization({ str: "refreshToken" }),
  authController.callMethod("refreshToken")
);

authRouter.post(
  "/login",
  authValidate.payloadLogin(),
  authMiddleware.handleAuthorization({ str: "login" }),
  authController.callMethod("login")
);

export default authRouter;
