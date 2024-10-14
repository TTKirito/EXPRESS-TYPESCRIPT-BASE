import {
  Login,
  LoginPhone,
  RefreshToken,
  VerifyPhoneOtp,
} from "./routes/auth.routes";
import {
  loginBody,
  loginPhoneBody,
  verifyPhoneOtpBody,
  refreshTokenBody,
} from "./schema/auth.schema";

const api = (port) => ({
  openapi: "3.0.3",
  info: {
    version: "1.3.0",
    title: "BESTFOODY - Documentation",
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: `http://localhost:3000/v1`,
      description: "Local Server",
    },
    {
      url: "",
      description: "Dev Server",
    },
  ],
  tags: [
    {
      name: "Auth",
    },
  ],
  paths: {
    "/auth/login": {
      post: Login,
    },
    "/auth/login/phone": {
      post: LoginPhone,
    },
    "/auth/login/phone/verify": {
      post: VerifyPhoneOtp,
    },
    "/auth/refresh": {
      post: RefreshToken,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      loginBody,
      loginPhoneBody,
      verifyPhoneOtpBody,
      refreshTokenBody,
    },
  },
});

export { api };
