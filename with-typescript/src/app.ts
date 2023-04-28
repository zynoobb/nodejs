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

async function connectToDB() {
  try {
    await database;
    console.log("😎😎 DB is running 😎😎");
  } catch (error) {
    console.log("database not connected 😂" + error);
  }
}

connectToDB();

export default app;
