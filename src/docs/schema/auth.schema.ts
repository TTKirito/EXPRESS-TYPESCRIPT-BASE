import { ROLE } from "../../constants/common";
import { USER_STATUS } from "../../constants/enum";

const role = {
  type: "object",
  properties: {
    id: { type: "number", example: 1 },
    name: { type: "string", enum: Object.values(ROLE), example: ROLE.ADMIN },
    created_date: { type: "string", example: new Date() },
    modified_date: { type: "string", example: new Date() },
    delete_date: { type: "string", example: new Date() },
  },
};

const user = {
  type: "object",
  properties: {
    id: { type: "number", example: 1 },
    dislay_name: { type: "string", example: "Cooper" },
    user_name: { type: "string", example: "Cooper" },
    status: {
      type: "string",
      enum: Object.values(USER_STATUS),
      example: USER_STATUS.ACTIVE,
    },
    email: { type: "string", example: "cooper@vinova.com.sg" },
    phone: { type: "string", example: "+84384727914" },
    created_date: { type: "string", example: new Date() },
    modified_date: { type: "string", example: new Date() },
    delete_date: {
      type: "string",
      example: new Date(),
    },
    login_with_socies: { type: "string", example: "COMPLETED" },
    image: {
      type: "string",
      example: "https:url",
    },
    roles: { type: "array", items: role },
  },
};

export const authResponse = {
  success: { type: "boolean", example: true },
  result: {
    type: "object",
    properties: {
      token: { type: "string", example: "jwt" },
      refresh_token: { type: "string", example: "jwt" },
      user: user,
    },
  },
};

export const loginBody = {
  type: "object",
  properties: {
    email: { type: "string", example: "cooper@vinova.com.sg" },
    password: { type: "string", example: "Vinova123" },
  },
};

export const loginPhoneBody = {
  type: "object",
  properties: {
    phone: { type: "string", example: "+84384727914" },
  },
};

export const verifyPhoneOtpBody = {
  type: "object",
  properties: {
    phone: { type: "string", example: "+84384727914" },
    otp: { type: "number", example: "12345" },
  },
};

export const refreshTokenBody = {
  type: "object",
  properties: {
    refresh_token: { type: "string", example: "jwt" },
  },
};
