import errors from "../constants/errors";
import CustomError from "./customError";

export default class NotFoundError extends CustomError {
  code = 404;

  constructor() {
    super(errors.ROUTE_NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: errors.NOT_FOUND, code: this.code }];
  }
}
