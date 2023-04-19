import database from "../../../database";
import { UserService } from "../../users/service";
import { PostDTO, PostsDTO } from "../dto";

export class PostService {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  // searchValue : 검색어
  async getPosts({ skip, take }, searchValue) {
    const posts = await database.post.findMany({
      where: {
        title: {
          contains: searchValue ?? "",
        },
      },
      include: {
        user: true,
      },
      skip,
      take,
      orderBy: {
        createAt: "desc",
      },
    });

    const count = await database.post.count({
      where: {
        title: {
          contains: searchValue,
        },
      },
    });

    return {
      posts: posts.map((post) => new PostsDTO(post)),
      count,
    };
  }

  async getPost(id, user) {
    const post = await database.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
            childComments: {
              include: {
                user: true,
              },
            },
          },
        },
        tag: true,
        postLike: true,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없음" };

    return new PostDTO(post, user);
  }

  async createPostLike(userId, postId) {
    const user = await this.userService.findUserById(userId);
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없음" };
    const isLiked = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (isLiked) return;

    await database.postLike.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });
  }

  async deletePostLike(userId, postId) {
    const user = await this.userService.findUserById(userId);
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없음" };
    const isLiked = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (!isLiked) return;

    await database.postLike.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });
  }

  // 좋아요 합치기
  async postLike(userId, postId, isLike) {
    const user = await this.userService.findUserById(userId);
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없음" };
    const isLiked = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (isLike && !isLiked) {
      await database.postLike.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      });
    } else if (!isLike && isLiked) {
      await database.postLike.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId: post.id,
          },
        },
      });
    }
    return;
  }

  // props : CreatePostDTO
  async createPost(props) {
    const user = await this.userService.findUserById(props.userId);

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

  async updatePost(postId, props, user) {
    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };
    if (post.userId !== user.id)
      throw { status: 403, message: "본인 글만 수정이 가능합니다." };

    if (props.tags) {
      await database.tag.deleteMany({
        where: {
          postId: post.id,
        },
      });
      await database.tag.createMany({
        data: props.tags.map((tag) => ({
          name: tag,
          postId: post.id,
        })),
      });
    }

    await database.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: props.title,
        content: props.content,
      },
    });
  }
  async updateComment(commentId, props, user) {
    const comment = await database.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw { status: 404, message: "댓글이 존재하지 않습니다." };
    if (comment.userId !== user.id)
      throw { status: 403, message: "댓글 수정 권한이 없습니다." };

    await database.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: props.content,
      },
    });
  }
}
