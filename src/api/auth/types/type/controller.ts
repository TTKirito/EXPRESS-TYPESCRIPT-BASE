import { Request } from "express";

export type TParameter = {
  TP: Object;
  TQ: Object;
  TB: Object;
};

export type TRequestParameter<T extends TParameter> = Request<
  T["TP"],
  object,
  T["TB"],
  T["TQ"]
>;

export type TInputRequestParameter = {
  TP: {};
  TQ: {};
  TB: {
    phone?: string;
    refresh_token?: string;
    email?: string;
    password?: string;
  };
};

export type TToken = {
  token: string;
  refresh_token: string;
  user?: object;
};
