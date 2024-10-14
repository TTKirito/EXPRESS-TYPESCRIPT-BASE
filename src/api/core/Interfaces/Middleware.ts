import { TIMiddleware } from "../Types/Middleware";

export interface IMiddleware<T extends TIMiddleware> {
  handleAuthorization<I extends T["handleAuthorization"]>(payload: I): any;
  checkRole<I extends T["checkRole"]>(payload: I): any;
}
