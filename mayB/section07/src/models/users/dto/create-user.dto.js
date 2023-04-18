import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

export class CreateUserDTO {
  name;
  phoneNumber;
  email;
  password;
  description;

  constructor(user) {
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.password = user.password;
    this.description = user.description;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.PASSWORD_SALT)
    );
  }
}
