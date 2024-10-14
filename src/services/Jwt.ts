import JWT from "jsonwebtoken";
import { IJwt } from "./types/interface/TJwt";
import { TJwt } from "./types/type/Jwt";

export default class Jwt implements IJwt<TJwt> {
  static instance: Jwt;

  static getInstance() {
    if (!Jwt.instance) {
      Jwt.instance = new Jwt();
    }
    return Jwt.instance;
  }

  private secret: string;
  private expiresIn: number;

  constructor() {
    this.secret = String(process.env.JWT_SECRET);
    this.expiresIn = Number(process.env.JWT_EXPIRATION);
  }

  issue<I extends { payload: Object; expires: number }>({
    payload,
    expires,
  }: I): string {
    return JWT.sign(payload, this.secret, {
      expiresIn: expires || this.expiresIn,
    });
  }

  verify<I extends { token: string }>({ token }: I): string | JWT.JwtPayload {
    return JWT.verify(token, this.secret);
  }
}
