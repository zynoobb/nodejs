import { Service } from "typedi";
import { UserService } from "../users/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  IAuthGetAccessToken,
  IAuthLogin,
  IAuthRestoreToken,
  IAuthSetRefreshToken,
} from "./interfaces/auth.interface";
import { redisClient } from "../../redis";
dotenv.config();

@Service()
export class AuthService {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login({ loginDTO, res }: IAuthLogin): Promise<string> {
    const { name, password } = loginDTO;

    const user = await this.userService.findOneByName({ name });
    if (!user) throw { status: 404, message: "유저가 존재하지 않음" };

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw { status: 401, message: "비밀번호 불일치" };

    this.setRefreshToken({ user, res });

    return this.getAccessToken({ user });
  }

  restoreToken({ user, res }: IAuthRestoreToken): string {
    this.setRefreshToken({ user, res });
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthGetAccessToken): string {
    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS, {
      expiresIn: "1d",
    });
  }

  setRefreshToken({ user, res }: IAuthSetRefreshToken): void {
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH, {
      expiresIn: "2w",
    });
    res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; path-/`);
  }

  async logout({ req }): Promise<void> {
    const accessToken = req.headers["authorization"].split(" ")[1];
    const refreshToken = req.headers["cookie"].split("=")[1];

    try {
      const jwtAccess = jwt.verify(accessToken, process.env.JWT_ACCESS);
      const jwtRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH);

      const multi = redisClient.multi();
      multi.set(
        accessToken,
        accessToken,
        "EX",
        jwtAccess["exp"] - jwtAccess["iat"]
      );
      multi.set(
        refreshToken,
        refreshToken,
        "EX",
        jwtRefresh["exp"] - jwtRefresh["iat"]
      );
      await multi.exec();
    } catch (error) {
      throw { status: 500, message: "서버 오류" };
    }
  }
}
