import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "../src/models";
import { AppDataSource } from "./db";

const app = express();
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

app.get("/", (req, res) => {
  res.send("health Checker");
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    message: error.message || "서버 에러",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("😎😎 DB is running 😎😎");
  })
  .catch((error) => console.log(error));

export default app;
