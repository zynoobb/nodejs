export class UpdateUserDTO {
  name: string | undefined;
  password: string | undefined;

  constructor(data) {
    this.name = data.name ?? undefined;
    this.password = data.password ?? undefined;
  }
}
