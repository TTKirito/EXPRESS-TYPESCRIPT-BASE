import Bcrypt from "bcrypt";
import { IBcrypt } from "./types/interface/Bcrypt";
import { TBcrypt } from "./types/type/Bcrypt";

export default class BcryptUtils implements IBcrypt<TBcrypt> {
  static instance: BcryptUtils;

  static getInstance() {
    if (!BcryptUtils.instance) {
      BcryptUtils.instance = new BcryptUtils();
    }
    return BcryptUtils.instance;
  }

  private saltRounds: number;

  constructor() {
    this.saltRounds = Number(process.env.SALT_ROUNDS);
  }

  hash<I extends { password: string }>({ password }: I): Promise<string> {
    return Bcrypt.hash(password, this.saltRounds);
  }

  hashSync<I extends { password: string }>({ password }: I): string {
    return Bcrypt.hashSync(password, this.saltRounds);
  }

  compare<I extends { password: string; hash: string }>({
    password,
    hash,
  }: I): Promise<Boolean> {
    return Bcrypt.compare(password, hash);
  }

  compareSync<I extends { password: string; hash: string }>({
    password,
    hash,
  }: I): Boolean {
    return Bcrypt.compareSync(password, hash);
  }
}
