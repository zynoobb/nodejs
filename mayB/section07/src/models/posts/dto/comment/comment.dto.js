import { UsersDTO } from "../../../users/dto";

export class CommentDTO {
  id;
  content;
  user;
  childComments;

  constructor(props) {
    this.id = props.id;
    this.content = props.content;
    this.user = new UsersDTO(props.user);
    this.childComments = props.childComments?.map(
      (comment) => new CommentDTO(comment)
    );
  }
}
