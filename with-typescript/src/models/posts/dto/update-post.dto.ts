export class UpdatePostDTO {
  userId: string;
  postId: string;
  title: string | undefined;
  content: string | undefined;

  constructor(data) {
    this.userId = data.userId;
    this.postId = data.postId;
    this.title = data.title ?? undefined;
    this.content = data.content ?? undefined;
  }
}
