import winston from "./Winston";

export default {
  verbose: (message: string, addition: string = "") =>
    winston.verbose(message, addition),
  warn: (message: string) => winston.warn(message),
  error: (message: string, error: any) => winston.error(`${message}::${error}`),
  info: (message: string) => winston.info(`${message}`),
};
