import { Response } from "express";
import { IHander } from "./types/interface";
import { THandlerResponse } from "./types/type";

export class HanderReturn implements IHander<THandlerResponse> {
  static instance: HanderReturn;

  static getInstance() {
    if (!HanderReturn.instance) {
      HanderReturn.instance = new HanderReturn();
    }
    return HanderReturn.instance;
  }

  handleReturnResponse<
    I extends {
      status: number;
      res: Response<any, Record<string, any>>;
      result: any;
    }
  >({ res, status, result }: I) {
    return res.status(status).json({ success: true, result });
  }

  handleExceptionResponse<
    I extends {
      status: number;
      res: Response<any, Record<string, any>>;
      error: string;
    }
  >({ res, status, error }: I) {
    return res.status(status).json({ success: false, error });
  }
}
