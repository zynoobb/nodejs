import { NextFunction, Response, Router } from "express";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { jwtAuth } from "../../middleware";
import { RequestWithAuth } from "./interfaces/auth.interface";

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
    this.router.post("/restore", jwtAuth, this.restoreToken.bind(this));
    this.router.post("/logout", jwtAuth, this.logout.bind(this));
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

  async restoreToken(req: RequestWithAuth, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      const accessToken = await this.authService.restoreToken({ user, res });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: RequestWithAuth, res: Response, next: NextFunction) {
    try {
      await this.authService.logout({ req });
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
