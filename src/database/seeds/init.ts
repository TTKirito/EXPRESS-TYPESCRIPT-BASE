import { config } from "dotenv";
import { ROLE } from "../../constants/common";
import BcryptUtils from "../../services/Bcrypt";
import { connectToDb } from "../connection";
import { loadEntityConnection } from "../models";
import { Role } from "../models/role";
import { User } from "../models/user";
import { UserRole } from "../models/userRole";

config();

const bcrypt = BcryptUtils.getInstance();

async function seed() {
  await connectToDb();
  await loadEntityConnection();

  const hash = bcrypt.hashSync({ password: "Vinova123" });

  const role = await (
    await Role.insert([{ name: ROLE.USER }, { name: ROLE.ADMIN }])
  ).identifiers;
  const user = await (
    await User.insert([
      { phone: "+84384727914", user_name: "Thuan" },
      { user_name: "cooper", email: "cooper@vinova.com.sg", hash: hash },
    ])
  ).identifiers;
  const userRole = await (
    await UserRole.insert([
      { user_id: user[0].id, role_id: role[0].id },
      { user_id: user[1].id, role_id: role[1].id },
    ])
  ).identifiers;
}

seed();
