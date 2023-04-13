import { Router } from "express";

// Router
class UserController {
  router;
  users = [
    {
      id: 1,
      name: "jino",
      age: 30,
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
  getUsers(req, res) {
    res.status(200).json({ users: this.users });
  }
  // GET /users/detail/:id
  // 유저 한 명을 불러오는 API
  getUser(req, res) {
    const { id } = req.params;
    const user = this.users.find((user) => user.id === Number(id));
    res.status(200).json({ user });
  }
  // POST /users
  // 유저를 생성하는 API
  createUser(req, res) {
    const { name, age } = req.body;
    this.users.push({
      id: new Date().getTime(),
      name,
      age,
    });
    res.status(201).json({ users: this.users });
  }
}

const userController = new UserController();
export default userController;
