import { Request } from "express";
import { User } from "../entities/user.entity";

export interface IUserServiceTest {
  test: string;
}

export interface IUserFindOneByName {
  name: string;
}
export interface IUserFindOneById {
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
