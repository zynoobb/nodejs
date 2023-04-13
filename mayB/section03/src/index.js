import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import controllers from "./controllers";
// import UserController from "./controllers/users";

const app = express();
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

// 많은 컨트롤러들을 한번에 라우팅 설정하기 위해 forEach를 사용한다. 코드의 단순화
// app.use("/users", UserController.router); // router 도 함꼐 넣음
controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

app.get("/", (req, res) => {
  res.send("Nodejs ^_^");
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.log(err);

  res
    .status(err.status || 500)
    .json({ message: err.message || "서버에서 에러가 발생했습니다." });
});
app.listen(8000, () => {
  console.log("😀서버가 열렸습니다.😀");
});
