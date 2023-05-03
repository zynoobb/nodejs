export class CreatePostDTO {
  title: string;
  content: string;

  constructor(data) {
    this.title = data.title;
    this.content = data.content;
  }
}
