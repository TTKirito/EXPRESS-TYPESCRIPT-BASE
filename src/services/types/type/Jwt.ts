type TIsuses = {
  payload: Object;
  expires: number;
};

type TVerify = {
  token: string;
};

type TIJwt = {
  TIsuses: object;
  TVerify: object;
};

type TJwt = {
  TIsuses: TIsuses;
  TVerify: TVerify;
};

export { TIJwt, TJwt };
