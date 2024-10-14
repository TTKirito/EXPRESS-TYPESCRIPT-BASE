import { authResponse } from "../schema/auth.schema";
import {
  security,
  internalServerError,
  invalidEmailOrPassword,
  invalidRefreshToken,
  validOTPCode,
} from "../common/errors";

export const Login = {
  tags: ["Auth"],
  description: "Login",
  operationId: "Login",
  security,
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/loginBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: authResponse,
          },
        },
      },
    },
    "500": internalServerError,
    "400": invalidEmailOrPassword,
  },
};

export const LoginPhone = {
  tags: ["Auth"],
  description: "Login with phone",
  operationId: "Login with phone",
  security,
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/loginPhoneBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              result: { type: "boolean", example: true },
            },
          },
        },
      },
    },
    "500": internalServerError,
  },
};

export const VerifyPhoneOtp = {
  tags: ["Auth"],
  description: "Verify phone otp",
  operationId: "Verify phone otp",
  security,
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/verifyPhoneOtpBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: authResponse,
          },
        },
      },
    },
    "400": validOTPCode,
    "500": internalServerError,
  },
};

export const RefreshToken = {
  tags: ["Auth"],
  description: "Refresh token",
  operationId: "Refresh token",
  security,
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/refreshTokenBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: authResponse,
          },
        },
      },
    },
    "500": internalServerError,
    "400": invalidRefreshToken,
  },
};
