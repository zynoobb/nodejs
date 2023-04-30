import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../db";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { User } from "../models/users/entities/user.entity";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export async function jwtAuth(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const headers = req.headers;
    const authorization = headers["authorization"];

    if (
      !authorization.includes("Bearer") &&
      !authorization.includes("bearer")
    ) {
      next({ status: 401, message: "유효하지 않은 토큰" });
    }
    const accessToken = authorization.split(" ")[1];
    const jwtVerify = await jwt.verify(accessToken, process.env.JWT_ACCESS);
    const user = await userRepository.findOne({
      where: { id: jwtVerify["id"] },
    });

    if (!user) next({ status: 404, message: "유저를 찾을 수 없음" });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
