import { TParameterRedis } from "../type/Redis";

export interface IRedis<U extends TParameterRedis> {
  save<I extends U["Get"]>(payload: I): void;
  getKey<I extends U["Save"]>(payload: I): any;
}
