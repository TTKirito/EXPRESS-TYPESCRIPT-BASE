import { Request, Response } from "express";

export type CustomResponseType = {
  success: Boolean;
  result: any
}

type TDirection = "ASC" | "DESC";

export type TParams = object;

export type TParameter = {
  TP: Object;
  TQ: Object;
  TB: Object;
};

export type TBody = object;

export type TRequestParameter<T extends TParameter> = Request<
  T["TP"],
  object,
  T["TB"],
  T["TQ"]
>;

export type TInputGetManyService = {
  page?: number;
  fields?: string[];
  filter?: object;
  sortBy?: string;
  orderBy?: "ASC" | "DESC";
  limit?: number;
  skip?: number;
  offset?: number;
};

export type TInputGetOneService = {
  id: number;
};

export type TInputResponse = { status: number; res: Response; result: any };

export type TInputParameter<T> = {
  TQ: {
    page?: number;
    fields?: string[];
    filter?: object;
    sortBy?: string;
    orderBy?: TDirection;
    limit?: number;
    skip?: number,
    offset?: number
  };
  TP: { id: number };
  TB: T & { ids?: number[] };
};
