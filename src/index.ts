import express from "express";
import { env } from "./config/env";
import { ServeApi } from "./ServeApi";

const main = async () => {
  const app = express();
  const api = new ServeApi(app, env.port);
  api.init();
};

main();
