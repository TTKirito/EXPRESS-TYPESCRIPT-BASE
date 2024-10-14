import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../../exceptions/requestValidationError";
import { IValidate } from "./Interfaces/Validate";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { HanderReturn } from "../../utils/Handler";
import { TInputResponse } from "./Types/Controller";

const errorHander = HanderReturn.getInstance();

export default abstract class Validate
  implements IValidate<Request, Response, NextFunction>
{
  private queryValidate(): any[] {
    return [
      check("orderBy").isString().optional(),
      check("sortBy").isString().optional(),
      check("filter").isObject().optional(),
      check("fields").isArray().optional(),
      check("fields.*").isString().optional(),
      this.validate,
    ];
  }

  validate<
    RE extends Request<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
    RS extends Response<any, Record<string, any>>,
    next extends NextFunction
  >(req: RE, res: RS, next: next): any {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return errorHander.handleExceptionResponse<{
      status: number;
      res: Response;
      error: any;
    }>({
      status: 400,
      res,
      error: new RequestValidationError(errors.array()).serializeErrors(),
    });
  }
}
