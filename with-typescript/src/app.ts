import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "../src/models";
import database from "./db";

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

async () => {
  try {
    const connection = await database;
    console.log("database connected");
  } catch (error) {
    console.log("database not connected 😂" + error);
  }
};

export default app;
