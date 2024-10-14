import { JwtPayload } from "jsonwebtoken";
import { TIJwt } from "../type/Jwt";

export interface IJwt<U extends TIJwt> {
  issue<I extends U["TIsuses"]>(payload: I): string;
  verify<I extends U["TVerify"]>(payload: I): string | JwtPayload;
}
