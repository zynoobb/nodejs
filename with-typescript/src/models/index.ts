import { UserController, UserSwagger } from "./users";
import { AuthController, AuthSwagger } from "./auth";
import { PostController, PostSwagger } from "./posts";

export const Controllers = [
  UserController, //
  AuthController, //
  PostController,
];

export const Swaggers = [
  UserSwagger, //
  AuthSwagger, //
  PostSwagger, //
];
