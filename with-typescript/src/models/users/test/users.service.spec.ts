import { UserService } from "../user.service";
import { MockUserRepository } from "./users-mockDB";
import { beforeEach, describe, it } from "@jest/globals";

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    userService = new UserService(mockUserRepository as any);
  });

  describe("fetchUser", () => {
    it("id에 해당하는 데이터를 가져와야 함", async () => {
      const user = await userService.fetchUser({ id: "user1_id" });

      expect(user).toEqual({
        id: "user1_id",
        name: "user1_name",
        createAt: new Date("2022-01-01T00:00:00.000Z"),
      });
    });

    it("일치하는 아이디가 없는 경우 에러 반환해야 함", async () => {
      try {
        await userService.fetchUser({ id: "user4_id" });
      } catch (error) {
        expect(error).toEqual({
          status: 404,
          message: "유저가 존재하지 않음",
        });
      }
    });
  });
});
