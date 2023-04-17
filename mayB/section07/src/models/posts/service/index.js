import database from "../../../database";
import { UserService } from "../../users/service";

export class PostService {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  // props : CreatePostDTO
  async createPost(props) {
    const user = await this.userService.findUserById(props.userId);

    console.log(props.tags);
    const newPost = await database.post.create({
      data: {
        title: props.title,
        content: props.content,
        user: {
          connect: {
            id: user.id,
          },
        },
        tag: {
          createMany: {
            data: props.tags.map((tag) => ({ name: tag })),
          },
        },
      },
    });

    return newPost.id;
  }

  // 부모 댓글 생성 서비스
  // props : CreateCommentDTO
  async createComment(props) {
    const user = await this.userService.findUserById(props.id);

    const post = await database.post.findUnique({
      where: {
        id: props.postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없음" };

    const newComment = await database.comment.create({
      data: {
        content: props.content,
        post: {
          connect: {
            id: post.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return newComment.id;
  }

  // 자식 댓글 생성 서비스
  async createChildComment(props) {
    const user = await this.userService.findUserById(props.userId);

    const parentComment = await database.comment.findUnique({
      where: {
        id: props.parentCommentId,
      },
    });

    if (!parentComment) throw { status: 404, message: "부모 댓글이 없습니다." };

    const newChildComment = await database.comment.create({
      data: {
        content: props.content,
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: parentComment.postId,
          },
        },
        parentComment: {
          connect: {
            id: parentComment.id,
          },
        },
      },
    });
    return newChildComment.id;
  }
}
