import bcrypt from "bcrypt";

export class LoginDTO {
  email;
  password;

  constructor(props) {
    this.email = props.email;
    this.password = props.password;
  }

  // 암호화된 비밀번호와 비교
  async comparePassword(password) {
    const isCorrect = await bcrypt.compare(this.password, password);
    return isCorrect;
  }
}
