import { IUserId } from "../interfaces/user.interface";

export class MockUser {
  id: string;
  name: string;
  createAt: Date;
}

export class MockUserRepository {
  database = [
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
      name: "user1_name",
      createAt: new Date("2022-06-01T00:00:00.000Z"),
    },
  ];

  find(): MockUser[] {
    return this.database;
  }

  findOne(data: IMockFindOneById): MockUser {
    return this.database.find((el) => el.id === data.where.id);
  }
}

interface IMockFindOneById {
  where: {
    id: string;
  };
}
