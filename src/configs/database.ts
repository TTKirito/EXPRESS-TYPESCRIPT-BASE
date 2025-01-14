import { DbConfig } from "../utils/types/type";

export const dbConfig = async (): Promise<DbConfig> => ({
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASS),
  host: String(process.env.POSTGRES_HOST),
  port: String(process.env.POSTGRES_PORT),
  dbname: String(process.env.POSTGRES_DB_NAME),
});

export default {
  dbConfig,
};
