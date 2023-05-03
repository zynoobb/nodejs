import { NextFunction, Request, Response, Router } from "express";
import { jwtAuth } from "../../middleware";
import { RequestWithAuth } from "../auth/interfaces/auth.interface";
import { UserService } from "../users/user.service";
import { CreatePostDTO } from "./dto/create-post.dto";
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
}

const postController = new PostController();
export default postController;
