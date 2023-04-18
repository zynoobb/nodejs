export class CreateCommentDTO {
  content;
  userId;
  postId;

  constructor(props) {
    this.content = props.content;
    this.postId = props.postId;
    this.userId = props.userId;
  }
}
