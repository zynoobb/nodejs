import { Request } from "express";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export interface IUserServiceTest {
  test: string;
}

export interface IUserFindOneByName {
  name: string;
}
export interface IUserId {
  id: string;
}

export interface RequestWithPagination extends Request {
  skip: number;
  take: number;
}

export interface IUserFetchUsers {
  skip: number;
  take: number;
}

export interface IUserFetchUsersResponse {
  users: User[];
  count: number;
}

export interface IUserUpdateUser {
  id: string;
  updateUserDTO: UpdateUserDTO;
}
