import express from "express";
import { env } from "./config/env";
import { ServeApi } from "./ServeApi";
import { ServerServices } from "./services/ServerServices";

const main = async () => {
  const app = express();
  const api = new ServeApi(app, env.port, new ServerServices());
  api.init();
};

main();
