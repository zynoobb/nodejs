import { Service } from "typedi";
import { AppDataSource } from "../../db";
import { UserService } from "../users/user.service";
import { PostDTO } from "./dto/post.dto";
import { Post } from "./entities/post.entity";
import {
  IPostCreatePost,
  IPostDeletePost,
  IPostFetchPostResponse,
  IPostFetchPostsResponse,
  IPostId,
  IPostUpdatePost,
} from "./interfaces/post.interface";

@Service()
export class PostService {
  public userService: UserService;
  constructor(
    private readonly postRepository = AppDataSource.getRepository(Post)
  ) {
    this.userService = new UserService();
  }

  async createPost({
    userId,
    createPostDTO,
  }: IPostCreatePost): Promise<string> {
    const userVerify = await this.userService.findOneById({ id: userId });
    if (!userVerify) throw { status: 404, message: "유저 없음" };

    const { title, content } = createPostDTO;

    this.checkEmpty(title);
    this.checkEmpty(content);

    const result = await this.postRepository.save({
      user: { id: userId },
      title,
      content,
    });

    return result.id;
  }

  checkEmpty(text: string): void {
    if (text.trim() === "" || text[0] === " ")
      throw { status: 400, message: "공백 불허용" };
  }

  async deletePost({ postId, userId }: IPostDeletePost): Promise<void> {
    const userVerify = await this.userService.findOneById({ id: userId });
    if (!userVerify) throw { status: 404, message: "유저 없음" };

    const post = await this.fetchPostById({ id: postId });

    if (!post) throw { status: 404, message: "게시글 없음" };
    if (post.user.id !== userId)
      throw { status: 401, message: "접근 권한 없음" };

    await this.postRepository.softDelete({ id: post.id });
  }

  async fetchPostById({ id }: IPostId): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async fetchPost({ id }: IPostId): Promise<IPostFetchPostResponse> {
    const result = await this.postRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    const user = result.user;
    return new PostDTO(result, user);
  }

  async fetchPosts({ skip, take }): Promise<IPostFetchPostsResponse> {
    const data = await this.postRepository.find({
      skip,
      take,
      relations: ["user"],
    });
    const count = data.length;
    const posts = data.map((post) => new PostDTO(post, post.user));

    return { posts, count };
  }

  async updatePost({ updatePostDTO }: IPostUpdatePost): Promise<void> {
    const { userId, postId, ...updatePost } = updatePostDTO;
    const userVerify = await this.userService.findOneById({ id: userId });
    if (!userVerify) throw { status: 404, message: "유저 없음" };

    const post = await this.fetchPostById({ id: postId });

    if (!post) throw { status: 404, message: "게시글 없음" };
    if (post.user.id !== userId)
      throw { status: 401, message: "접근 권한 없음" };

    await this.postRepository.save({
      ...post,
      ...updatePost,
    });
  }
}
