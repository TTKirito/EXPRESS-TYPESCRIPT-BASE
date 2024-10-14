import { TIBcrypt } from "../type/Bcrypt";

export interface IBcrypt<U extends TIBcrypt> {
  hash<I extends U["Thash"]>(payload: I): Promise<string>;
  hashSync<I extends U["Thash"]>(payload: I): string;
  compare<I extends U["Tcompare"]>(payload: I): Promise<Boolean>;
  compareSync<I extends U["Tcompare"]>(payload: I): Boolean;
}
