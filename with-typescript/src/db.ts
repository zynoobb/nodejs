import { DataSource } from "typeorm";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + "/**/*.entity.*"],
  synchronize: true,
  logging: true,
  driver: mysql2,
});
