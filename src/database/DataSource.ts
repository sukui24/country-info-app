import "reflect-metadata";
import { DataSource } from "typeorm";

import { env } from "../config/env";
import { CreateUserAndCalendarEvent_1_0_0_1744910802417 as CreateUserAndCalendarEvent } from "./migrations/1_0_0_AddUserAndCalendarEvent";
import { CalendarEvent } from "./models/CalendarEvent";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [User, CalendarEvent],
  migrations: [CreateUserAndCalendarEvent],
  synchronize: false,
  migrationsRun: true,
});
