import dotenv from "dotenv";
dotenv.config();

// TODO: Validate with Joi
export const env = {
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
