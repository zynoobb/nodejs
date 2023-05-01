import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../db";
import { NextFunction, Response } from "express";
import { User } from "../models/users/entities/user.entity";
import { redisClient } from "../redis";

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
    const cookie = headers["cookie"];

    if (authorization === undefined || cookie === undefined) {
      throw { status: 401, message: "토큰값 없음" };
    }

    const { accessVerify, accessToken } = await jwtValidate(
      authorization,
      next
    );
    const refreshToken = await jwtValidate(cookie, next);

    await logoutValidate(accessToken, next);
    await logoutValidate(refreshToken, next);

    const user = await userRepository.findOne({
      where: { id: accessVerify["id"] },
    });

    if (!user) next({ status: 404, message: "유저를 찾을 수 없음" });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

async function jwtValidate(jwtToken: string, next: NextFunction): Promise<any> {
  try {
    let token: string | undefined;
    let type: string | undefined;

    if (jwtToken.includes("Bearer") || jwtToken.includes("bearer")) {
      token = jwtToken.split(" ")[1];
      type = "access";
    } else if (jwtToken.includes("refresh")) {
      token = jwtToken.split("=")[1];
      type = "refresh";
    }

    if (!token) throw { status: 401, message: "유효하지 않은 토큰" };

    if (type === "access") {
      const accessVerify = jwt.verify(token, process.env.JWT_ACCESS);
      const accessToken = token;
      if (accessVerify) return { accessVerify, accessToken };
    } else if (type === "refresh") {
      const refreshVerify = jwt.verify(token, process.env.JWT_REFRESH);
      if (refreshVerify) return token;
    } else {
      throw { status: 401, message: "유효하지 않은 토큰" };
    }
  } catch (error) {
    next(error);
  }
}

async function logoutValidate(
  token: string,
  next: NextFunction
): Promise<void> {
  try {
    const redisToken = await new Promise((resolve, reject) => {
      redisClient.get(token, (error, data) => {
        if (error) reject(error);
        resolve(data);
      });
    });

    if (token === redisToken) throw { status: 401, message: "로그아웃된 토큰" };
  } catch (error) {
    next(error);
  }
}
