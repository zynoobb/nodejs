export class UpdateUserDTO {
  name;
  password;

  constructor(data) {
    this.name = data.name ?? undefined;
    this.password = data.password ?? undefined;
  }
}
