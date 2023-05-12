import { UserDTO } from "../../users/dto";

export class MockPost {
  id: string;
  title: string;
  content: string;
  createAt: string;
  user: UserDTO;
}

class MockUserRepository {
  database = [
    {
      id: "user1_id",
      name: "user1_name",
      password: "password",
      createAt: new Date("2022-01-01T00:00:00.000Z"),
    },
  ];

  findOne(id) {
    const filteredDatabase = this.database.map(({ password, ...rest }) => rest);
    return filteredDatabase.find((el) => el.id === id);
  }
}

export class MockPostRepository {
  userRepository: MockUserRepository;
  constructor() {
    this.userRepository = new MockUserRepository();
  }
  database = [
    {
      id: "post1_id",
      title: "post1_title",
      content: "post1_content",
      createAt: new Date("2022-01-01T00:00:00.000Z"),
      user: "user1_id",
    },
    {
      id: "post2_id",
      title: "post2_title",
      content: "post2_content",
      createAt: new Date("2022-06-01T00:00:00.000Z"),
      user: "user1_id",
    },
  ];

  findOne(data: IMockFindOnePostId): IMockPostFetchPostResponse {
    const post = this.database.find((el) => el.id === data.where.id);
    const user = this.userRepository.findOne(post.user);

    return { ...post, user };
  }

  find({ skip, take }): IMockPostFetchPostResponse[] {
    const filteredDatabase = this.database.map((post) => {
      const user = this.userRepository.findOne(post.user);
      return { ...post, user };
    });
    const posts = filteredDatabase.slice(skip, take);

    console.log(posts);
    return posts;
  }
}

interface IMockFindOnePostId {
  where: {
    id: string;
  };
  relations: ["User"];
}

interface IMockPostFetchPostResponse {
  id: string;
  title: string;
  content: string;
  createAt: Date;
  user: {
    id: string;
    name: string;
    createAt: Date;
  };
}
