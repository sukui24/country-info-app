import { DataSource } from "typeorm";
import { env } from "../config/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [], // TODO: Import models
  synchronize: false, // TODO: Migrations
});
