import { User } from "../../users/entities/user.entity";
import { UserDTO } from "../../users/dto";

export class PostDTO {
  id: string;
  title: string;
  content: string;
  createAt: Date;
  user: UserDTO;

  constructor(data, user) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.createAt = data.createAt;
    this.user = new UserDTO(user);
  }
}
