import { UsersDTO } from "../../users/dto";
import { CommentDTO, TagDTO } from "../../posts/dto";

export class PostDTO {
  id;
  title;
  content;
  createAt;
  likeCount;
  isLiked;
  user;
  comments;
  tags; // 배열

  constructor(props, user) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createAt = props.createAt;
    this.likeCount = props.postLike.length;
    this.isLiked = user
      ? !!props.postLike.find((like) => like.userId === user.id)
      : false;
    this.user = new UsersDTO(props.user);
    this.comments = props.comments.map(
      (comment) =>
        new CommentDTO({
          id: comment.id,
          content: comment.content,
          childComments: comment.childComments,
          user: comment.user,
        })
    );
    this.tags = props.tag.map(
      (tag) =>
        new TagDTO({
          id: tag.id,
          name: tag.name,
        })
    );
  }
}
