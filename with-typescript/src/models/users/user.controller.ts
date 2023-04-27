import { Request, Response, Router } from "express";
import { UserService } from "./user.service";

class UserController {
  public router = Router();
  public path = "/user";
  private readonly userService = new UserService();

  constructor() {
    this.init();
  }

  init() {
    this.router.get("/test", this.test.bind(this));
  }

  test(req: Request, res: Response) {
    const testText = req.body.test;
    console.log(testText);
    const result = this.userService.test({ test: testText });
    res.status(200).json({ result });
  }
}

const userController = new UserController();
export default userController;
