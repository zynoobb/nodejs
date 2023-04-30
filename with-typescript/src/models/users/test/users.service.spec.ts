import { UserService } from "../user.service";
import { MockUserRepository } from "./users-mockDB";
import { beforeEach, describe, it } from "@jest/globals";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { CreateUserDTO } from "../dto";

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

  describe("fetchUsers", () => {
    it("모든 유저들의 정보를 가져와야 함", async () => {
      const [skip, take] = [0, 5];
      const result = await userService.fetchUsers({ skip, take });

      expect(result).toEqual({
        users: {
          count: 3,
          users: [
            {
              id: "user1_id",
              name: "user1_name",
              createAt: new Date("2022-01-01T00:00:00.000Z"),
            },
            {
              id: "user2_id",
              name: "user2_name",
              createAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              id: "user3_id",
              name: "user3_name",
              createAt: new Date("2022-06-01T00:00:00.000Z"),
            },
          ],
        },
      });
    });

    it("skip & take가 적용된 유저들의 정보를 가져와야 함", async () => {
      const [skip, take] = [1, 5];
      const result = await userService.fetchUsers({ skip, take });

      expect(result).toEqual({
        users: {
          count: 2,
          users: [
            {
              id: "user2_id",
              name: "user2_name",
              createAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              id: "user3_id",
              name: "user3_name",
              createAt: new Date("2022-06-01T00:00:00.000Z"),
            },
          ],
        },
      });
    });
  });

  describe("createUser", () => {
    it("유저 생성 시 아이디값 반환", async () => {
      const createUserDTO = new CreateUserDTO({
        name: "testName",
        password: "testPassword",
      });
      const result = await userService.createUser({ createUserDTO });

      expect(result).toEqual(expect.any(String));
    });

    it("이미 존재하는 유저일 시 에러 반환", async () => {
      const createUserDTO = new CreateUserDTO({
        name: "user1_id",
        password: "testPassword",
      });
      try {
        await userService.createUser({ createUserDTO });
      } catch (error) {
        expect(error).toEqual({
          status: 409,
          message: "이미 존재하는 유저",
        });
      }
    });
  });

  describe("updateUser", () => {
    it("유저 업데이트 시 undefined 반환", async () => {
      const id = "user1_id";
      const updateUserDTO = new UpdateUserDTO({ name: "newName" });
      const result = await userService.updateUser({ id, updateUserDTO });

      expect(result).toBeUndefined();
    });

    it("유저 존재하지 않을 시 오류 반환", async () => {
      try {
        const id = "user4_id";
        const updateUserDTO = new UpdateUserDTO({ name: "newName" });
        await userService.updateUser({ id, updateUserDTO });
      } catch (error) {
        expect(error).toEqual({
          status: 404,
          message: "유저가 존재하지 않음",
        });
      }
    });

    describe("deleteUser", () => {
      it("유저 삭제 시 undefined 반환", async () => {
        const id = "user1_id";
        const result = await userService.deleteUser({ id });

        expect(result).toBeUndefined();
      });
    });

    describe("deleteUser", () => {
      it("유저 존재하지 않을 시 오류 반환", async () => {
        try {
          const id = "user4_id";
          await userService.deleteUser({ id });
        } catch (error) {
          expect(error).toEqual({
            status: 404,
            message: "유저가 존재하지 않음",
          });
        }
      });
    });
  });

  // findOneById
  describe("findOneById", () => {
    it("저장되어 있는 아이디일 시 유저 정보 반환", async () => {
      const id = "user1_id";
      const result = await userService.findOneById({ id });
      expect(result).toEqual({
        id: "user1_id",
        name: "user1_name",
        createAt: new Date("2022-01-01T00:00:00.000Z"),
      });
    });

    it("유효한 아이디가 아닐 시 undefined 반환", async () => {
      const id = "user4_id";
      const result = await userService.findOneById({ id });
      expect(result).toBeUndefined();
    });
  });

  // findOnebyName
});
