import { NextFunction, Request, Response, Router } from "express";
import { jwtAuth } from "../../middleware";
import { RequestWithAuth } from "../auth/interfaces/auth.interface";
import { UserService } from "../users/user.service";
import { CreatePostDTO } from "./dto/create-post.dto";
import { UpdatePostDTO } from "./dto/update-post.dto";
import { RequestWithAuthNParams } from "./interfaces/post.interface";
import { PostService } from "./post.service";

class PostController {
  public router = Router();
  public path = "/post";
  private postService: PostService;

  constructor() {
    this.init();
    this.postService = new PostService();
  }

  init() {
    this.router.post("/", jwtAuth, this.createPost.bind(this));
    this.router.get("/:postId", this.fetchPost.bind(this));
    this.router.patch("/:postId", jwtAuth, this.updatePost.bind(this));
  }

  async createPost(req: RequestWithAuth, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const createPostDTO = new CreatePostDTO(req.body);
      const id = await this.postService.createPost({ userId, createPostDTO });
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }

  async fetchPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const post = await this.postService.fetchPost({ id: postId });
      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(
    req: RequestWithAuthNParams,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;
      const updatePostDTO = new UpdatePostDTO({ userId, postId, ...req.body });
      await this.postService.updatePost({ updatePostDTO });
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}

const postController = new PostController();
export default postController;
