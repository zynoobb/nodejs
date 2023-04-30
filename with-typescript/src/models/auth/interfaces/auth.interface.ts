import { Response } from "express";
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

interface IAuthUser {
  id: string;
  name: string;
  password: string;
  createAt: Date;
}
