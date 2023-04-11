import express from "express";
import cors from "cors";
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

// express 미들웨어 사용법 app.use() // 미들웨어나 라우터로만 사용 가능
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
// extended false 시 쿼리 모듈이 달라짐
app.use(express.urlencoded({ extended: true, limit: "700mb" }));
// app.use 는 엔드포인트 및 콜백 함수를 넣을 수 있음 (단 모두 메서드가 get으로 통일이 됨)
// app.use("/users", (req, res, next) => {});

const today = new Date();
const todayToDayjs = dayjs(today).format("YYYY.MM-DD");
// console.log(today, todayToDayjs);
const password = "1234";
const hashedPassword = bcrypt.hashSync(password, 10);
// console.log({ hashedPassword });
const token = jwt.sign("1234", "accessToken");
// console.log({ token });

let users = [
  {
    id: 1,
    name: "jinho",
    age: 30,
  },
];

// 유저 정보 가져오기
// get의 경우 성공시 상태코드 status 200
// query / path 로 데이터를 받음
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});
// 유저 생성하기
// post 경우 성공시 상태코드 status 201
// 요청을 body로 받음
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  users.push({
    id: new Date().getTime(),
    name,
    age,
  });
  res.status(201).json({ users });
});
// 유저 수정
// patch 경우 성공시 상태코드 status 204
// req.params.id
// req.body 를 통해 받음
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  console.log("id :", id);
  console.log("param", req.params);
  users.forEach((el) => console.log(typeof el.id));
  const targetIdx = users.findIndex((user) => user.id == Number(id)); // 전부 문자열로 들어오기 때문에, Number
  users[targetIdx] = {
    id: users[targetIdx].id,
    name: name ?? users[targetIdx].name,
    age: age ?? users[targetIdx].age,
  };
  res.status(204).json({}); // 204로 반환 시 json 비움
});
// 유저 삭제
// delete 경우 성공시 상태코드 status 204
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  users.forEach((el) => el.id);
  const deleteUser = users.map((user) => user.id !== Number(id));
  users = deleteUser;
  res.status(204).json({});
});

app.get("/", (req, res) => {
  res.send("Nodejs ^_^");
});

app.listen(8000, () => {
  console.log("😀서버가 열렸습니다.😀");
});
