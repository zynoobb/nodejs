import { Response } from "express";
import { User } from "../../users/entities/user.entity";
import { LoginDTO } from "../dto/login.dto";

export interface ILogin {
  loginDTO: LoginDTO;
  res: Response;
}

export interface IGetAccessToken {
  user: IAuthUser;
}

export interface ISetRefreshToken {
  user: IAuthUser;
  res: Response;
}

export interface RequestWithAuth extends Request {
  user: User;
}

export interface IAuthRestoreToken {
  user: IAuthUser;
  res: Response;
}
interface IAuthUser {
  id: string;
  name: string;
  password: string;
  createAt: Date;
}
