import { NextFunction, Request, Response } from "express";
import { BaseModel } from "../../database/models/BaseModel";
import { HanderReturn } from "../../utils/Handler";
import logger from "../../utils/Winston";
import { IController } from "./Interfaces/Controller";
import Service from "./Service";
import {
  TInputGetManyService,
  TInputResponse,
  TRequestParameter,
  TInputParameter,
} from "./Types/Controller";

export default abstract class Controller<T extends Partial<BaseModel>>
  implements IController<TRequestParameter<TInputParameter<T>>, Response>
{
  protected errorHander: HanderReturn;
  public service: Service<T>;
  constructor() {
    this.errorHander = HanderReturn.getInstance();
  }

  callMethod(method: string): any {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await this[method](req, res, next);
      } catch (e) {
        logger.error(e.message, e);
        if (Number(e.code) === 42703) {
          e.code = 500;
        }

        if (Number(e.code) === 42601) {
          e.code = 500;
        }

        if (Number(e.code) === 23503) {
          e.code = 500;
        }

        if (!e.code) {
          e.code = 500;
        }

        return this.errorHander.handleExceptionResponse({
          status: e.code,
          res: res,
          error: e.message,
        });
      }
    };
  }

  async createOne<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const body = request.body as T;
    const result = await this.service.create(body);
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result: result,
    });
  }

  async deleteMultiple<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const ids = request.body.ids;
    const result = await this.service.deleteMultiple({ ids: [] });
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result: result,
    });
  }

  async deleteOne<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const id = request.params.id;
    const result = await this.service.deleteOne({ id });
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result: result,
    });
  }

  async getMany<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const { page, fields, filter, sortBy, orderBy, limit, skip, offset } = request.query
    const result = await this.service.getMany<TInputGetManyService>({
      page,
      fields,
      filter,
      sortBy,
      orderBy,
      limit,
      skip,
      offset
    });
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result,
    });
  }

  async getOne<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const { id } = request.params;
    const result = await this.service.getById({
      id,
    });
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result: result,
    });
  }

  async updateOne<
    RE extends TRequestParameter<TInputParameter<T>>,
    RS extends Response<any, Record<string, any>>
  >(request: RE, response: RS): Promise<Response<any, Record<string, any>>> {
    const { body } = request;
    const id = request.params.id;
    const result = await this.service.updateOne<{
      data: object;
      clauses: object;
    }>({
      data: body,
      clauses: { id },
    });
    return this.errorHander.handleReturnResponse<TInputResponse>({
      status: 200,
      res: response,
      result: result,
    });
  }
}
