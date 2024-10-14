import { Response } from "express";
import { CustomResponseType } from "../../../core/Types/Controller";
import { TParameter, TRequestParameter } from "../type/controller";

export interface IAuth<
  RS extends TRequestParameter<TParameter>,
  RP extends Response<CustomResponseType>
> {
  loginWithPhone<I extends RS>(payload: I, response: Response): Promise<RP>;
  verifyPhoneOtp<I extends RS>(payload: I, response: Response): Promise<RP>;
  refreshToken<I extends RS>(payload: I, response: Response): Promise<RP>;
  login<I extends RS>(payload: I, response: Response): Promise<RP>;
}
