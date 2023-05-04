import { Request } from "express";
import { UserDTO } from "../../users/dto";
import { User } from "../../users/entities/user.entity";
import { CreatePostDTO } from "../dto/create-post.dto";
import { PostDTO } from "../dto/post.dto";
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

export interface IPostId {
  id: string;
}

export interface IPostFetchPostResponse {
  id: string;
  title: string;
  content: string;
  createAt: Date;
  user: UserDTO;
}

export interface IPostFetchPostsResponse {
  posts: PostDTO[];
  count: number;
}

export interface IPostDeletePost {
  postId: string;
  userId: string;
}
