import { Router } from "express";
import { pagination } from "../../middleware/pagination";
import { UsersDTO, CreateUserDTO, UpdateUserDTO } from "../dto";
import { UserService } from "../service";

// Router
class UserController {
  router;
  path = "/users"; // 라우터의 경로 설정
  userService;

  constructor() {
    this.router = Router();
    this.init();
    this.userService = new UserService();
  }

  init() {
    this.router.get("/", pagination, this.getUsers.bind(this)); // bind 임시적으로 사용
    this.router.get("/detail/:id", this.getUser.bind(this));
    this.router.post("/", this.createUser.bind(this));
    this.router.post("/:id", this.updateUser.bind(this));
    this.router.post("/:id", this.deleteUser.bind(this));
  }
  // 전체 유저를 조회
  async getUsers(req, res, next) {
    try {
      const { users, count } = await this.userService.findUsers({
        skip: req.skip,
        take: req.take,
      });

      res
        .status(200)
        .json({ users: users.map((user) => new UsersDTO(user)), count });
    } catch (err) {
      next(err);
    }
  }
  // GET /users/detail/:id
  // 유저 한 명을 불러오는 API
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);
      res.status(200).json({ user: new UsersDTO(user) });
    } catch (err) {
      next(err);
    }
  }

  // POST /users
  // 유저를 생성하는 API
  async createUser(req, res, next) {
    try {
      const createUserDto = new CreateUserDTO(req.body);
      const newUserId = await this.userService.createUser(createUserDto);
      res.status(201).json({ id: newUserId });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateUserDTO = new UpdateUserDTO(req.body);
      await this.userService.updateUser(id, updateUserDTO);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();
export default userController;
