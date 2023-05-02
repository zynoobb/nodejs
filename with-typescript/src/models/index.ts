import { UserController, UserSwagger } from "../models/users";
import { AuthController, AuthSwagger } from "./auth";

export const Controllers = [
  UserController, //
  AuthController, //
];

export const Swaggers = [
  UserSwagger, //
  AuthSwagger,
];
