import { UserRole } from "../../database/models/userRole";
import Repository from "../core/Repository";

export default class UserRoleRepository extends Repository<Partial<UserRole>> {
  static instance: UserRoleRepository;

  static getInstance() {
    if (!UserRoleRepository.instance) {
      UserRoleRepository.instance = new UserRoleRepository(UserRole);
    }
    return UserRoleRepository.instance;
  }
}
