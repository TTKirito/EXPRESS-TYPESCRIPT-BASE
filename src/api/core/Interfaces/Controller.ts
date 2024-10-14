import { Response } from "express";
import { TRequestParameter, TParameter, CustomResponseType } from "../Types/Controller";

export interface IController<
  RQ extends TRequestParameter<TParameter>,
  RP extends Response<CustomResponseType>
> {
  callMethod(method: string): any;
  getMany<RE extends RQ, RS extends RP>(request: RE, response: RS): Promise<RP>;
  getOne<RE extends RQ, RS extends RP>(request: RE, response: RS): Promise<RP>;
  createOne<RE extends RQ, RS extends RP>(
    request: RE,
    response: RS
  ): Promise<RP>;
  updateOne<RE extends RQ, RS extends RP>(
    request: RE,
    response: RS
  ): Promise<RP>;
  deleteOne<RE extends RQ, RS extends RP>(
    request: RE,
    response: RS
  ): Promise<RP>;
  deleteMultiple<RE extends RQ, RS extends RP>(
    request: RE,
    response: RS
  ): Promise<RP>;
}
