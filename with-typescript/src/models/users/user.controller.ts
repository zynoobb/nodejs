import { NextFunction, Request, Response, Router } from "express";
import { jwtAuth, pagination } from "../../middleware";
import { RequestWithAuth } from "../auth/interfaces/auth.interface";
import { CreateUserDTO, UserDTO } from "./dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { RequestWithPagination } from "./interfaces/user.interface";
import { UserService } from "./user.service";

class UserController {
  public router = Router();
  public path = "/user";
  private userService: UserService;
  constructor() {
    this.init();
    this.userService = new UserService();
  }

  init() {
    this.router.get("/:id", this.fetchUser.bind(this));
    this.router.get("/", pagination, this.fetchUsers.bind(this));

    this.router.post("/", this.createUser.bind(this));
    this.router.patch("/", jwtAuth, this.updateUser.bind(this));

    this.router.delete("/", jwtAuth, this.deleteUser.bind(this));
  }

  // createUser
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDTO = new CreateUserDTO(req.body);
      const user = await this.userService.createUser({ createUserDTO });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  // fetchUser
  async fetchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.fetchUser({ id });
      res.status(200).json({ user: new UserDTO(user) });
    } catch (error) {
      next(error);
    }
  }

  // fetchUsers
  async fetchUsers(
    req: RequestWithPagination,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { users, count } = await this.userService.fetchUsers({
        skip: req.skip,
        take: req.take,
      });

      res.status(200).json({
        users: users.map((user) => new UserDTO(user)),
        count,
      });
    } catch (error) {
      next(error);
    }
  }

  // updateUser
  async updateUser(req: RequestWithAuth, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const updateUserDTO = new UpdateUserDTO(req.body);
      await this.userService.updateUser({ id, updateUserDTO });

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }

  // deleteUser
  async deleteUser(req: RequestWithAuth, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      await this.userService.deleteUser({ id });
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
