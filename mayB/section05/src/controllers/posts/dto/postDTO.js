export class PostDTO {
  id;
  title;
  content;

  constructor(post) {
    this.id = post.id;
    this.title = post.titie;
    this.content = post.content;
  }
}
