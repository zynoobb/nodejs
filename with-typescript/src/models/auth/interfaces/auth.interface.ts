import { Response } from "express";
import { User } from "../../users/entities/user.entity";
import { LoginDTO } from "../dto/login.dto";

export interface IAuthLogin {
  loginDTO: LoginDTO;
  res: Response;
}

export interface IAuthGetAccessToken {
  user: IAuthUser;
}

export interface IAuthSetRefreshToken {
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
