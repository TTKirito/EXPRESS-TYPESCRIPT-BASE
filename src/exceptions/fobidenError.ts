import errors from "../constants/errors";
import CustomError from "./customError";

export default class ForbiddenError extends CustomError {
  code = 403;

  constructor() {
    super(errors.FORBIDDEN);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: errors.FORBIDDEN, code: this.code }];
  }
}
