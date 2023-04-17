import bcrypt from "bcrypt";
import dotenv from "dotenv";
export class UpdateUserDTO {
  name;
  phoneNumber;
  email;
  password;
  description;

  constructor(user) {
    this.name = user.name ?? undefined;
    this.phoneNumber = user.phoneNumber ?? undefined;
    this.email = user.email ?? undefined;
    this.password = user.password ?? undefined;
    this.description = user.description ?? undefined;
  }

  async updatePassword(password) {
    this.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
  }
}
