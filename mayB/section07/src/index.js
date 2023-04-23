import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Controllers } from "./models";
import { swaggerDocs, options } from "./swagger";
import swaggerUi from "swagger-ui-express";
import database from "./database";
import dotenv from "dotenv";
import { jwtAuth } from "./middleware";
import expressSession from "express-session";
dotenv.config();

//
(async () => {
  const app = express();
  await database.$connect();

  // middleware
  app.use(cors({ origin: "*" }));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "700mb" }));
  app.use(jwtAuth);
  app.use(
    expressSession({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
  });

  app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, options));

  app.get("/", (req, res) => {
    res.send("Nodejs ^_^");
  });

  app.use((err, req, res, next) => {
    console.log(err);

    res
      .status(err.status || 500)
      .json({ message: err.message || "서버에서 에러가 발생했습니다." });
  });
  app.listen(8000, () => {
    console.log("😀서버가 열렸습니다.😀");
  });
})();
