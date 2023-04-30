import { Service } from "typedi";
import { UserService } from "../users/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  IGetAccessToken,
  ILogin,
  ISetRefreshToken,
} from "./interfaces/auth.interface";
dotenv.config();

@Service()
export class AuthService {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login({ loginDTO, res }: ILogin): Promise<string> {
    const { name, password } = loginDTO;

    const user = await this.userService.findOneByName({ name });
    if (!user) throw { status: 404, message: "유저가 존재하지 않음" };

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw { status: 401, message: "비밀번호 불일치" };

    this.setRefreshToken({ user, res });

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IGetAccessToken): string {
    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS, {
      expiresIn: "1d",
    });
  }

  setRefreshToken({ user, res }: ISetRefreshToken): void {
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH, {
      expiresIn: "2w",
    });
    res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; path-/`);
  }
}
