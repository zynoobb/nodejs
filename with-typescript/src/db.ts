import { createConnection } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();

const config: MysqlConnectionOptions = {
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
};

const database = createConnection(config);
export default database;
