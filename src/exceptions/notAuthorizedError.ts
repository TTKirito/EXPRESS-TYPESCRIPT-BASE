import errors from "../constants/errors";
import CustomError from "./customError";

export default class NotAuthorizedError extends CustomError {
  code = 401;

  constructor() {
    super(errors.NOT_AUTHORIZED);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: errors.NOT_AUTHORIZED, code: this.code }];
  }
}
