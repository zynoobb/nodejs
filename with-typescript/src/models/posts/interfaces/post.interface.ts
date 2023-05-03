import { CreatePostDTO } from "../dto/create-post.dto";

export interface IPostCreatePost {
  userId: string;
  createPostDTO: CreatePostDTO;
}
