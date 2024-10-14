export interface IValidate<Request, Response, NextFunction> {
  validate<RE extends Request, RS extends Response, next extends NextFunction>(
    req: RE,
    res: RS,
    next: next
  ): RS | void;
}
