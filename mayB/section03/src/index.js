import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import UserController from "./users";

const app = express();
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));
app.use("/users", UserController.router); // router 도 함꼐 넣음

app.get("/", (req, res) => {
  res.send("Nodejs ^_^");
});

app.listen(8000, () => {
  console.log("😀서버가 열렸습니다.😀");
});
