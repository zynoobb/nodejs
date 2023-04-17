import { Router } from "express";
import { CreatePostDTO, CreateCommentDTO, CreateChildCommentDTO } from "../dto";
import { PostService } from "../service";

class PostController {
  router;
  path = "/post";
  postService;

  constructor() {
    this.router = Router();
    this.init();
    this.postService = new PostService();
  }

  init() {
    this.router.post("/", this.createPost.bind(this));
    this.router.post("/comment", this.createComment.bind(this));
    this.router.post("/child-comment", this.createChildComment.bind(this));
  }
  // create Post
  async createPost(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
      const body = req.body;

      const newPostId = await this.postService.createPost(
        new CreatePostDTO({
          title: body.title,
          content: body.content,
          tags: body.tags,
          userId: req.user.id,
        })
      );

      res.status(200).json({ id: newPostId });
    } catch (err) {
      next(err);
    }
  }
  async createComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
      const body = req.body;

      const newCommentId = await this.postService.createComment(
        new CreateCommentDTO({
          content: body.content,
          userId: req.user.id,
          postId: body.postId,
        })
      );
      res.status(201).json({ id: newCommentId });
    } catch (err) {
      next(err);
    }
  }
  async createChildComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
      const body = req.body;

      const newChildCommentId = await this.postService.createChildComment(
        new CreateChildCommentDTO({
          content: body.content,
          parentCommentId: body.parentCommentId,
          userId: req.user.id,
        })
      );

      res.status(201).json({ id: newChildCommentId });
    } catch (err) {
      next(err);
    }
  }
}

const postController = new PostController();
export default postController;
