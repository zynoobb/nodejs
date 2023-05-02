export const getUserSwagger = {
  "/user/:id": {
    get: {
      tags: ["User"],
      summary: "유저 상세 조회합니다.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      createAt: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getUsersSwagger = {
  "/user": {
    get: {
      tags: ["User"],
      summary: "유저 리스트를 조회합니다.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "number",
          },
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "number",
          },
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        createAt: {
                          type: "string",
                        },
                      },
                    },
                  },
                  count: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const updateUserSwagger = {
  "/user": {
    patch: {
      tags: ["User"],
      summary: "유저를 수정합니다.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export const createUserSwagger = {
  "/user": {
    post: {
      tags: ["User"],
      summary: "유저를 생성합니다.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const deleteUserSwagger = {
  "/user": {
    delete: {
      tags: ["User"],
      summary: "유저를 삭제합니다.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};
