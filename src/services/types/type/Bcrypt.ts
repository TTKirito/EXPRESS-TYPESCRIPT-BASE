type Thash = {
  password: string;
};

type Tcompare = {
  password: string;
  hash: string;
};

type TBcrypt = {
  Thash: Thash;
  Tcompare: Tcompare;
};

type TIBcrypt = {
  Thash: object;
  Tcompare: object;
};

export { TIBcrypt, TBcrypt };
