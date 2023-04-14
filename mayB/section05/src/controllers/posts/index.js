import { Router } from "express";
import { PostDTO } from "./dto/postDTO";

class PostController {
  router;
  path = "/posts";

  posts = [
    {
      id: "id1",
      title: "title1",
      content: "content1",
    },
  ];

  constructor() {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.get("/", this.getPosts.bind(this));
  }

  getPosts(req, res, next) {
    try {
      const posts = this.posts.map((post) => new PostDTO(post));
      res.status(200).json({ posts: this.posts });
    } catch (err) {
      next(err);
    }
  }
}

const postController = new PostController();
export default postController;
