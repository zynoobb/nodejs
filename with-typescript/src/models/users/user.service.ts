import { User } from "./entities/user.entity";
import {
  IUserFetchUsers,
  IUserFetchUsersResponse,
  IUserFindOneByName,
  IUserId,
  IUserServiceTest,
  IUserUpdateUser,
} from "./interfaces/user.interface";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Service } from "typedi";
import { AppDataSource } from "../../db";

dotenv.config();

@Service()
export class UserService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User)
  ) {}

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

  async deleteUser({ id }: IUserId): Promise<void> {
    const userVerify = await this.findOneById({ id });
    if (!userVerify) throw { status: 404, message: "유저가 존재하지 않음" };
    await this.userRepository.softDelete({ id });
  }

  async findOneByName({ name }: IUserFindOneByName): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }

  async findOneById({ id }: IUserId): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async fetchUser({ id }: IUserId): Promise<User> {
    const user = await this.findOneById({ id });
    if (!user) throw { status: 404, message: "유저가 존재하지 않음" };
    return user;
  }

  async fetchUsers({
    skip,
    take,
  }: IUserFetchUsers): Promise<IUserFetchUsersResponse> {
    const users = await this.userRepository.find({ skip, take });
    const count = users.length;

    return { users, count };
  }

  async updateUser({ id, updateUserDTO }: IUserUpdateUser): Promise<void> {
    const user = await this.findOneById({ id });
    if (!user) throw { status: 404, message: "유저가 존재하지 않음" };
    let { name, password } = updateUserDTO;

    if (password)
      password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

    await this.userRepository.save({
      ...user,
      name,
      password,
    });
  }
}
