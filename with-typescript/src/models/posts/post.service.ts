import { Service } from "typedi";
import { AppDataSource } from "../../db";
import { UserService } from "../users/user.service";
import { Post } from "./entities/post.entity";
import { IPostCreatePost } from "./interfaces/post.interface";

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
}
