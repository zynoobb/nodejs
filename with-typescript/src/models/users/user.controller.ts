import { NextFunction, Request, Response, Router } from "express";
import { CreateUserDTO } from "./dto";
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
    this.router.get("/", this.test.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }

  test(req: Request, res: Response) {
    const testText = req.body.test;
    console.log(testText);
    const result = this.userService.test({ test: testText });
    res.status(200).json({ result });
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

  // fetchUsers

  // updateUser

  // deleteUser
}

const userController = new UserController();
export default userController;
