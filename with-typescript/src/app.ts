import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "../src/models";

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

export default app;
