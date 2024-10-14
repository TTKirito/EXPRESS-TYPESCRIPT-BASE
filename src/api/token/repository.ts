import { Token } from "../../database/models/token";
import Repository from "../core/Repository";

export default class TokenRepository extends Repository<Partial<Token>> {
  static instance: TokenRepository;

  static getInstance() {
    if (!TokenRepository.instance) {
      TokenRepository.instance = new TokenRepository(Token);
    }
    return TokenRepository.instance;
  }

  private test() {}
}
