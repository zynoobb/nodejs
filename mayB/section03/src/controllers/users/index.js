import { Router } from "express";

// Router
class UserController {
  router;
  path = "/users"; // 라우터의 경로 설정
  users = [
    {
      id: 1,
      name: "jino",
      age: 1,
    },
  ];
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.get("/", this.getUsers.bind(this)); // bind 임시적으로 사용
    this.router.get("/detail/:id", this.getUser.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }
  // 전체 유저를 조회
  getUsers(req, res, next) {
    try {
      res.status(200).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }
  // GET /users/detail/:id
  // 유저 한 명을 불러오는 API
  getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = this.users.find((user) => user.id === Number(id));
      if (!user) {
        throw { status: 404, message: "유저를 찾을 수 없습니다." };
      }
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }
  // POST /users
  // 유저를 생성하는 API
  createUser(req, res, next) {
    try {
      const { name, age } = req.body;
      if (!name) {
        throw { status: 404, message: "이름이 없습니다." };
      }
      if (!age) {
        throw { status: 404, message: "나이가 없습니다." };
      }
      this.users.push({
        id: new Date().getTime(),
        name,
        age,
      });

      res.status(201).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();
export default userController;
