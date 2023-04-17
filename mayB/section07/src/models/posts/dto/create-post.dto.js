export class CreatePostDTO {
  title;
  content;
  userId;
  tags; // 배열

  constructor(props) {
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.tags = props.tags;
  }
}
