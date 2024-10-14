import { ValidationError } from "express-validator";
import CustomError from "./customError";
import error from "../constants/errors";

export class RequestValidationError extends CustomError {
  code = 400;

  constructor(public errors: ValidationError[]) {
    super(error.INVALID_REQUEST_PARAMETERS);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err: any) => {
      return { message: err.msg, field: err.path };
    });
  }
}
