export type TAuthService = {
  LP: { phone: string };
  L: { email: string, password: string }
};

export type TInputAuthService = {
  LP: { phone: string; refreshToken: string };
  L: { email: string, password: string }
};
