const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dog", (req, res) => {
  res.send({ "sound ": "멍멍" });
});

// json 이라 명확하게 할 수 있음
app.get("/dogjson", (req, res) => {
  res.json({ sound: "멍멍" });
});

// 파라미터 받는 방식 (:)
app.get("/param/:id", (req, res) => {
  const p = req.params;
  res.json(p.id);
});

// 쿼리로 받는 방식 "?" 를 넣어야 정상 작동
//localhost:3000/query/example?key=value&iam=the&korean=topclass
// { key: 'value', iam: 'the', korean: 'topclass' }
app.get("/query/:id", (req, res) => {
  const q = req.query;
  console.log(q);
  res.json(q);
});

// api

app.get("/sound/:name", (req, res) => {
  const obj = {
    dog: "멍멍",
    cat: "야옹",
    fox: "오히야이야후",
  };
  const { name } = req.params;

  res.json({ sound: obj[name] });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
