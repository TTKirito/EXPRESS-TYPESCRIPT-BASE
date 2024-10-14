import { User } from "../../database/models/user";
import Repository from "../core/Repository";

export default class AuthRepository extends Repository<Partial<User>> {
  static instance: AuthRepository;

  static getInstance() {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository(User);
    }
    return AuthRepository.instance;
  }

  private test() {
      
  }
}
