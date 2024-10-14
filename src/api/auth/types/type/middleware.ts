import { Request } from "express";

export type TAuthMiddlewareParameter = {
  TP: Object;
  TQ: Object;
  TB: Object;
};

export type TAuthMiddlewareRequestParameter<T extends TAuthMiddlewareParameter> = Request<
  T["TP"],
  object,
  T["TB"],
  T["TQ"]
>;

export type TInputAuthMiddlewareRequestParameter = {
  TP: {};
  TQ: {};
  TB: { phone?: string, otp?: number, refresh_token?: string };
};
