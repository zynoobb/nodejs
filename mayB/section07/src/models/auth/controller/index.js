import { Router } from "express";
import { AuthService } from "../service";
import { RegisterDTO, LoginDTO } from "../dto";
import { googlePassport } from "../../../middleware";

class AuthController {
  authService;
  router;
  path = "/auth";

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.init();
  }
  init() {
    // auth에 대한 모든 메서드는 post로 작성
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
    this.router.post("/refresh", this.refresh.bind(this));
    this.router.get(
      "/login/google",
      googlePassport.authenticate("google-passport", {
        scope: ["profile", "email", "phone"],
        session: false,
        failureRedirect: "/auth/login",
      }),
      this.googleLogin.bind(this)
    );
  }

  async googleLogin(req, res, next) {
    try {
      const { accessToken, refreshToken } = await this.authService.googleLogin(
        req.user
      );

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const body = req.body;

      const { accessToken, refreshToken } = await this.authService.register(
        new RegisterDTO(body)
      );

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const body = req.body;
      const { accessToken, refreshToken } = await this.authService.login(
        new LoginDTO(body)
      );

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const body = req.body;
      const { newAccessToken, newRefreshToken } =
        await this.authService.refresh(body.accessToken, body.refreshToken);

      res.status(200).json({
        newAccessToken,
        newRefreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

const authController = new AuthController();
export default authController;
