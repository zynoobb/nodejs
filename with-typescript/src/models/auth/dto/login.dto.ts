export class LoginDTO {
  name: string;
  password: string;

  constructor(data) {
    this.name = data.name;
    this.password = data.password;
  }
}
