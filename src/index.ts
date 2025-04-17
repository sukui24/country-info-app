import express from "express";
import { env } from "./config/env";
import { Database } from "./database/Database";
import { AppDataSource } from "./database/DataSource";
import { ServeApi } from "./ServeApi";
import { ServerServices } from "./services/ServerServices";

const main = async () => {
  const db = new Database(AppDataSource);

  const app = express();
  const api = new ServeApi(app, env.port, db, new ServerServices());
  api.init();
};

main();
