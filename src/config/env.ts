import dotenv from "dotenv";
import Joi from "joi";
import { Environment } from "../types/env/Environment";
dotenv.config();

const envRaw = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  nagerUrl: process.env.NAGER_API_URL,
  countriesUrl: process.env.COUNTRIES_NOW_API_URL,
};

const { error, value } = Joi.object<Environment>({
  port: Joi.number().default(3000),
  db: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    user: Joi.string().required(),
    pass: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  nagerUrl: Joi.string().required(),
  countriesUrl: Joi.string().required(),
}).validate(envRaw);

if (error) {
  throw new Error(`Environment setup failed: ${error.message}`);
}

export const env = value;
