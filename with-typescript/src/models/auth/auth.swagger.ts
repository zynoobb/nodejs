export const loginSwagger = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "로그인",
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
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
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

export const restoreSwagger = {
  "/auth/restore": {
    post: {
      tags: ["Auth"],
      summary: "토큰 초기화",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
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

export const logoutSwagger = {
  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "로그아웃",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
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
