import { IUserServiceTest } from "./user.interface";

export class UserService {
  test({ test }: IUserServiceTest): string {
    return "test1" + test;
  }
}
