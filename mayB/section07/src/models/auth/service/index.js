import { CreateUserDTO } from "../../users/dto";
import { UserService } from "../../users/service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginDTO, RegisterDTO } from "../dto";

dotenv.config();

export class AuthService {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  async googleLogin(props) {
    let user = {
      name: props.displayName,
      password: String(process.env.SOCIAL_PASSWORD),
      email: props.emails[0].value,
      phoneNumber: process.env.SOCIAL_PHONE,
      description: props.displayName,
    };

    const isExist = await this.userService.checkUserByEmail(user.email);
    if (!isExist) {
      const { accessToken, refreshToken } = await this.register(
        new RegisterDTO(user)
      );
      return {
        accessToken,
        refreshToken,
      };
    } else {
      const { accessToken, refreshToken } = await this.login(
        new LoginDTO(user)
      );
      return { accessToken, refreshToken };
    }
  }

  // Props : RegisterDTO
  async register(props) {
    const isExist = await this.userService.checkUserByEmail(props.email);

    if (isExist) throw { status: 400, message: "이미 존재하는 이메일입니다." };

    const newUserId = await this.userService.createUser(
      new CreateUserDTO({
        ...props,
      })
    );
    const accessToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });

    return { accessToken, refreshToken };
  }

  // props : LoginDTO
  async login(props) {
    const isExist = await this.userService.checkUserByEmail(props.email);
    if (!isExist) throw { status: 404, message: "유저가 존재하지 않습니다." };

    const isCorrect = await props.comparePassword(isExist.password);
    if (!isCorrect)
      throw { status: 400, message: "비밀번호를 잘못 입력하였습니다." };

    const accessToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });

    return { accessToken, refreshToken };
  }

  async refresh(accessToken, refreshToken) {
    const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_KEY, {
      ignoreExpiration: true, // 만료된 것 무시
    });
    const refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_KEY);

    if (accessTokenPayload.id !== refreshTokenPayload.id) {
      throw { status: 403, message: "권한이 없습니다." };
    }

    const user = await this.userService.findUserById(accessTokenPayload.id);

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });

    return {
      newAccessToken,
      newRefreshToken,
    };
  }
}
