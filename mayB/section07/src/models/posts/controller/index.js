import { Router } from "express";
import { pagination } from "../../../middleware/pagination";
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
    this.router.get("/detail/:id", this.getPost.bind(this));
    this.router.get("/", pagination, this.getPosts.bind(this));
    this.router.post("/:postId/like", this.createLike.bind(this));
    this.router.delete("/:postId/like", this.deleteLike.bind(this));
    this.router.post("/:postId/like-combined", this.postLike.bind(this));

    this.router.post("/", this.createPost.bind(this));
    this.router.post("/comment", this.createComment.bind(this));
    this.router.post("/child-comments", this.createChildComment.bind(this));
  }

  async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPost(id, req.user);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }

  // post?page=1&limit=1&searchValue=제목1
  async getPosts(req, res, next) {
    try {
      const searchValue = req.query.searchValue;
      const { posts, count } = await this.postService.getPosts(
        { skip: req.skip, take: req.take },
        searchValue
      );

      res.status(200).json({
        posts,
        count,
      });
    } catch (err) {
      next(err);
    }
  }

  async createLike(req, res, next) {
    if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };
    const { postId } = req.params;
    await this.postService.createPostLike(req.user.id, postId);

    res.status(204).json({});
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteLike(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };
      const { postId } = req.params;
      await this.postService.deletePostLike(req.user.id, postId);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async postLike(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };
      const { postId } = req.params;
      const { isLike } = req.body;
      await this.postService.postLike(req.user.id, postId, isLike);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  // create Post
  async createPost(req, res, next) {
    try {
      const body = req.body;
      console.log(body.title, body.content, body.tags, req.user);
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
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
