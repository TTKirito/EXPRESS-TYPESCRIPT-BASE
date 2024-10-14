import { dbConfig } from "./src/configs/database"

module.exports = (async () => {
  const { port, host, username, password, dbname: database } = await dbConfig()

  return {
    type: 'postgres',
    host: host,
    port: parseInt(port),
    database: database,
    username: username,
    password: password,
    entities: ['src/database/models/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations'
    }
  }
})()
