export class MockPost {
  id: string;
  title: string;
  content: string;
  createAt: string;
  user: string;
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

  findOne(data: IMockFindOnePostId) {
    const post = this.database.find((el) => el.id === data.where.id);
    const user = this.userRepository.findOne(post.user);
    return { ...post, user };
  }
}

interface IMockFindOnePostId {
  where: {
    id: string;
  };
  relations: ["User"];
}
