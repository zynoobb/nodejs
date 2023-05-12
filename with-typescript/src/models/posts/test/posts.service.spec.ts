import { beforeEach, describe, it } from "@jest/globals";

import { PostService } from "../post.service";
import { MockPostRepository } from "./posts-mockDB";

describe("PostService", () => {
  let postService: PostService;
  let mockPostRepository: MockPostRepository;

  beforeEach(() => {
    mockPostRepository = new MockPostRepository();
    postService = new PostService(mockPostRepository as any);
  });

  describe("fetchPost", () => {
    it("id에 해당하는 데이터를 가져와야 함", async () => {
      const id = "post1_id";
      const post = await postService.fetchPost({ id });

      expect(post).toEqual({
        id: "post1_id",
        title: "post1_title",
        content: "post1_content",
        createAt: new Date("2022-01-01T00:00:00.000Z"),
        user: {
          id: "user1_id",
          name: "user1_name",
          createAt: new Date("2022-01-01T00:00:00.000Z"),
        },
      });
    });
  });
});
