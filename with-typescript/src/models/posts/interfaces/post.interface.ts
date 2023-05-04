import { Request } from "express";
import { User } from "../../users/entities/user.entity";
import { CreatePostDTO } from "../dto/create-post.dto";
import { UpdatePostDTO } from "../dto/update-post.dto";

export interface IPostCreatePost {
  userId: string;
  createPostDTO: CreatePostDTO;
}

export interface RequestWithAuthNParams extends Request {
  params: { postId: string };
  user: User;
}

export interface IPostUpdatePost {
  updatePostDTO: UpdatePostDTO;
}
