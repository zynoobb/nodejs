import { User } from "./entities/user.entity";
import {
  IUserFindOneById,
  IUserServiceTest,
} from "./interfaces/user.interface";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Service } from "typedi";
import { AppDataSource } from "../../db";

dotenv.config();

@Service()
export class UserService {
  userRepository = AppDataSource.getRepository(User);

  test({ test }: IUserServiceTest): string {
    return "test1" + test;
  }

  async createUser({ createUserDTO }): Promise<string> {
    const { name, password } = createUserDTO;
    const userVerify = await this.findOneByName({ name });
    if (userVerify) throw { status: 409, message: "이미 존재하는 유저" };

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );

    const user = await this.userRepository.save({
      name,
      password: hashPassword,
    });
    return user.id;
  }

  async findOneByName({ name }: IUserFindOneById): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }
}
