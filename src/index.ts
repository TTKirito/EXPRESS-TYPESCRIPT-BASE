import "dotenv/config";
import { Connection } from "typeorm";
import app from "./app";
import { connectToDb } from "./database/connection";
import { loadEntityConnection } from "./database/models";
import logger from "./utils/Winston";

async function start() {
  let connections: Connection[] = [];

  if (!connections.length) {
    connections = await connectToDb();
    await loadEntityConnection();
  }

  app.listen(3000, () => {
    logger.info(`> Server is running at: ${3000}`);
  });
}

start();
