// 프레임워크 없이 서버 만드는 방법
import http from "http";

let users = [
  {
    id: 1,
    name: "jinho",
    age: 0,
  },
];

const server = http.createServer((req, res) => {
  // localhost:8000
  console.log(req.url);
  if (req.url === "/") {
    res.end("http-server");
  } else if (req.url.startsWith("/users")) {
    if (req.method === "GET") {
      const parsedUrl = req.url.split("/");
      console.log({ parsedUrl });

      // GET /users
      if (parsedUrl.length === 2) {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8;",
        });
        res.write(JSON.stringify(users));
        res.end();

        // GET /users/:id
      } else if (parsedUrl.length >= 2) {
        const id = parsedUrl.at(-1); // user's id
        if (!id) {
          res.end();
        } else {
          const user = users.find((user) => user.id === Number(id));
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8;",
          });
          res.write(JSON.stringify(user));
          res.end();
        }
      }
    } else if (req.method === "POST") {
      let body = "";
      req
        .on("data", (data) => {
          console.log({ data });

          body += data;
        })
        .on("end", () => {
          console.log({ body });
          const { age, name } = JSON.parse(body);
          users.push({
            id: new Date().getTime(),
            age,
            name,
          });

          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8;",
          });
          res.write(JSON.stringify(users));
          res.end("lulu");
        });
    } else if (req.method === "DELETE") {
      const parsedUrl = req.url.split("/");

      if (parsedUrl.length <= 2) {
        res.end("wrong url");
      } else {
        const id = parsedUrl.at(-1);
        users.filter((user) => user.id !== Number(id));
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8;",
        });
        res.write(JSON.stringify(users));
        res.end();
      }
    }
  }
});

server.listen(8000, () => {
  console.log("😀 server On 😀");
});
