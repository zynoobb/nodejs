export class UserDTO {
  id: string;
  name: string;
  createAt: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.createAt = data.createAt;
  }
}
