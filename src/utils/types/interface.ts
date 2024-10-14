import { Send, TIFile, TIHander, TIHelper } from "./type";

export interface CustomResponse<T> {
  json(): Send<T>;
}

export interface IHander<T extends TIHander> {
  handleReturnResponse?<I extends T["handleReturnResponse"]>(value: I);
  handleExceptionResponse?<I extends T["handleExceptionResponse"]>(value: I);
}

export interface IHeper<T extends TIHelper> {
  generateRandStr?<I extends T["GenerateRanString"]>(value: I): T["Details"];
  capitalizeFirstLetter?<I extends T["CapitalizeFirstLetter"]>(
    value: I
  ): string;
}

export interface IFile<T extends TIFile, F> {
  getDetailFile?<I extends T["InputFile"]>(value: I): F;
}
