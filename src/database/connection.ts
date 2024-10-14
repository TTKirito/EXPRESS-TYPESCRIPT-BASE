import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { dbConfig } from "../configs/database";
import { DATABASE_CONNECTION } from "../constants/common";
// register 3rd party IOC container
TypeORM.useContainer(Container);

export const connectToDb = async () => {
  const { port, host, username, password, dbname } = await dbConfig();

  return TypeORM.createConnections([
    {
      type: "postgres",
      name: DATABASE_CONNECTION,
      logger: "advanced-console",
      logging: "all",
      entities: ["src/database/models/*.ts"],
      host,
      port: parseInt(port, 10),
      database: dbname,
      username: username,
      password: password,
      migrations: ["src/database/migrations"],
      cli: {
        migrationsDir: "src/database/migrations",
      },
    },
  ]);
};
