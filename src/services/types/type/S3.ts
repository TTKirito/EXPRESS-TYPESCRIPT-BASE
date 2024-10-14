type TGetURl = {
  key: string;
  type: string;
};

type TUpload = {
  body: any;
  name: string;
  type: string;
};

type TIS3 = {
  TGetURl: object;
  TUpload: object;
};

type TS3 = {
  TGetURl: TGetURl;
  TUpload: TUpload;
};

export { TIS3, TS3 };
