import { IUserServiceTest } from "./interfaces/user.interface";

export class UserService {
  test({ test }: IUserServiceTest): string {
    return "test1" + test;
  }
}
