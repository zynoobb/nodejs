import { NextFunction, Response, Router } from "express";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";

class AuthController {
  public router = Router();
  public path = "/auth";
  private authService: AuthService;
  constructor() {
    this.init();
    this.authService = new AuthService();
  }

  init() {
    this.router.post("/login", this.login.bind(this));
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDTO = new LoginDTO(req.body);
      const accessToken = await this.authService.login({ loginDTO, res });
      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
