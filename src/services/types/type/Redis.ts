export type TParameterRedis = {
  Save: Object;
  Get: Object;
  Expires: Object;
};

type TPayloadRedis = {
  key: string;
  value?: any;
  expires: number;
};

type ValidatePayloadRedis<O extends TPayloadRedis> = O extends {
  key: string;
  value: any;
  expires: number;
}
  ? O
  : O extends { key: string; value: any; expires?: number }
  ? O
  : O extends { key: string; value?: any; expires?: number }
  ? O
  : O extends { key: string; value?: any; expires?: number }
  ? O
  : never;

export type TInputParameterRedis = {
  Save: ValidatePayloadRedis<TPayloadRedis>;
  Get: ValidatePayloadRedis<TPayloadRedis>;
  Expires: ValidatePayloadRedis<TPayloadRedis>;
};
