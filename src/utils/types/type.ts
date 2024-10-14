import { Response } from "express";
import { GENERATE_STRING_ENUM } from "./enum";

export type TIHander = {
  handleReturnResponse: Object;
  handleExceptionResponse: Object;
};

interface Json {
  success: boolean;
  data: any[];
}

export type Send<T = Response> = (body?: Json) => T;

type THandlerReturn = {
  status: number;
  res: Response;
  result: any | any[];
};

type THanderError = {
  status: number;
  res: Response;
  error: string;
};

type ValidateHandlerReturn<O extends THandlerReturn> = O extends {
  status: number;
  res: Response;
  result: any;
}
  ? O
  : O extends {
      status: number;
      res?: Response;
      result?: any;
    }
  ? O
  : O extends {
      status?: number;
      res: Response;
      result?: any;
    }
  ? O
  : O extends {
      status?: number;
      res?: Response;
      result: any;
    }
  ? O
  : never;

type ValidateHandlerError<O extends THanderError> = O extends {
  status: number;
  res: Response;
  error: any;
}
  ? O
  : never;

export type THandlerResponse = {
  handleReturnResponse: ValidateHandlerReturn<THandlerReturn>;
  handleExceptionResponse: ValidateHandlerError<THanderError>;
};

export type TIFile = {
  InputFile: Object;
};

export type TDetailFile = {
  type?: string;
  fileName?: string;
  folderPrefix?: string;
  name?: string;
  ext?: string;
};

type TInputFile = {
  type: string;
  fileName: string;
  folderPrefix?: string;
};

type ValidateFile<O extends TInputFile> = O extends {
  type: string;
  fileName: string;
  folderPrefix: string;
}
  ? O
  : O extends { type: string; fileName: string; folderPrefix?: string }
  ? O
  : never;

export type TFile = {
  InputFile: ValidateFile<TInputFile>;
};

export type TIHelper = {
  GenerateRanString: Object;
  Details: Object;
  CapitalizeFirstLetter: Object;
};

type GenerateRanString = {
  length: number;
  type?: GENERATE_STRING_ENUM;
};

type Details = {
  token: string;
};

type CapitalizeFirstLetter = {
  str: string;
};

export type ValidateGenerateRanString<O extends GenerateRanString> = O extends {
  length: number;
  type: GENERATE_STRING_ENUM;
}
  ? O
  : O extends { length: number; type?: GENERATE_STRING_ENUM }
  ? O
  : never;

export type THepler = {
  GenerateRanString: ValidateGenerateRanString<GenerateRanString>;
  Details: Details;
  CapitalizeFirstLetter: CapitalizeFirstLetter;
};

export type meta = {
  count: number;
  total: number;
};

export type TList = {
  meta: meta;
  rows: any[];
};

export type DbConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
  dbname: string;
};
