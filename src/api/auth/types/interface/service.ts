import { TToken } from "../type/controller";
import { TAuthService } from "../type/service";

export interface IAuthService<T extends TAuthService> {
  loginWithPhone<I extends T["LP"]>(payload: I): Promise<Boolean>;
  verifyPhoneOTP<I extends T["LP"]>(payload: I): Promise<TToken>;
  refreshToken<I extends T["LP"]>(payload: I): Promise<TToken>;
  login<I extends T["L"]>(payload: I): Promise<TToken>;
}
