import { v4 as uuid } from "uuid";

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
      password: "password",
      createAt: new Date("2022-01-01T00:00:00.000Z"),
    },
    {
      id: "user2_id",
      name: "user2_name",
      password: "password",
      createAt: new Date("2023-01-01T00:00:00.000Z"),
    },
    {
      id: "user3_id",
      name: "user3_name",
      password: "password",
      createAt: new Date("2022-06-01T00:00:00.000Z"),
    },
  ];

  find({ skip, take }): IMockFetchUsersResponse {
    const filteredDatabase = this.database.map(({ password, ...rest }) => rest);
    const count = filteredDatabase.slice(skip, take).length;
    const users = filteredDatabase.slice(skip, take);
    return { users, count };
  }

  findOne(data: IMockFindOneById): MockUser {
    const filteredDatabase = this.database.map(({ password, ...rest }) => rest);
    return filteredDatabase.find((el) => el.id === data.where.id);
  }

  save(createUserDTO: IMockCreateUserDTO): MockUser {
    const { name, password } = createUserDTO;
    const id = uuid();
    this.database.push({
      id,
      name,
      password,
      createAt: new Date(),
    });
    const filteredDatabase = this.database.map(({ password, ...rest }) => rest);
    return filteredDatabase.at(-1);
  }

  softDelete(id: string): void {
    this.database = this.database.filter((user) => user.id !== id);
  }
}

interface IMockFindOneById {
  where: {
    id: string;
  };
}

interface IMockFetchUsersResponse {
  users: MockUser[];
  count: number;
}

interface IMockCreateUserDTO {
  name: string;
  password: string;
}
