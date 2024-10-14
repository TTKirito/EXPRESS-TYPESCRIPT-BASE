import CustomError from "./customError";

export default class BadRequestError extends CustomError {
  code = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, code: this.code }];
  }
}
