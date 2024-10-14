import { Role } from "../../database/models/role";
import Repository from "../core/Repository";

export default class RoleRepository extends Repository<Partial<Role>> {
  static instance: RoleRepository;

  static getInstance() {
    if (!RoleRepository.instance) {
      RoleRepository.instance = new RoleRepository(Role);
    }
    return RoleRepository.instance;
  }
}
