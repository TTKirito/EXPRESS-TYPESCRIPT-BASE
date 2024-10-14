import { getConnection } from "typeorm";
import { DATABASE_CONNECTION } from "../../constants/common";
import { Role } from "./role";
import { Token } from "./token";
import { User } from "./user";
import { UserRole } from "./userRole";

export const loadEntityConnection = async () => {
  const [BestFoodConnection] = await Promise.all([
    getConnection(DATABASE_CONNECTION),
  ]);
  User.useConnection(BestFoodConnection);
  Role.useConnection(BestFoodConnection);
  UserRole.useConnection(BestFoodConnection);
  Token.useConnection(BestFoodConnection);
};
