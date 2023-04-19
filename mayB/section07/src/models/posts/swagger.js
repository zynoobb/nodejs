export const getPostSwagger = {
  "/post/detail/:id": {
    get: {
      tags: ["Post"],
      summary: "게시글 상세 조회합니다.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
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
                  post: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      title: {
                        type: "string",
                      },
                      content: {
                        type: "string",
                      },
                      createAt: {
                        type: "string",
                        format: "date-time",
                      },
                      likeCount: {
                        type: "number",
                      },
                      isLiked: {
                        type: "boolean",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          phoneNumber: {
                            type: "string",
                          },
                        },
                      },
                      comments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            content: {
                              type: "string",
                            },
                            user: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                                email: {
                                  type: "string",
                                },
                                description: {
                                  type: "string",
                                },
                                phoneNumber: {
                                  type: "string",
                                },
                              },
                            },
                            childComments: {
                              type: "array",
                              items: {
                                id: {
                                  type: "string",
                                },
                                title: {
                                  type: "string",
                                },
                                content: {
                                  type: "string",
                                },
                                createAt: {
                                  type: "string",
                                  format: "date-time",
                                },
                                likeCount: {
                                  type: "number",
                                },
                                isLiked: {
                                  type: "boolean",
                                },
                                user: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    name: {
                                      type: "string",
                                    },
                                    email: {
                                      type: "string",
                                    },
                                    description: {
                                      type: "string",
                                    },
                                    phoneNumber: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      tags: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          name: {
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
    },
  },
};

export const getPostsSwagger = {
  "/post": {
    get: {
      tags: ["Post"],
      summary: "게시글 목록 조회합니다.",

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
        {
          in: "query",
          name: "searchValue",
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
                  post: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      title: {
                        type: "string",
                      },
                      content: {
                        type: "string",
                      },
                      createAt: {
                        type: "string",
                        format: "date-time",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          phoneNumber: {
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
    },
  },
};
export const postLikeSwagger = {
  "/post/:id/like-combined": {
    post: {
      tags: ["Post"],
      summary: "게시글을 좋아요 하기 혹은 삭제합니다.",
      parameters: [
        {
          in: "path",
          name: "Postid",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                isLike: {
                  type: "boolean",
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

export const createPostSwagger = {
  "/post": {
    post: {
      tags: ["Post"],
      summary: "게시물 생성",
      security: {
        bearerAuth: [],
      },
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "example-title",
                },
                content: {
                  type: "string",
                  example: "example-content",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
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

export const createCommentSwagger = {
  "/post/comment": {
    post: {
      tags: ["Post"],
      summary: "댓글 생성",
      security: {
        bearerAuth: [],
      },
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
                postId: {
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

export const createChildCommentSwagger = {
  "/post/child-comments": {
    post: {
      tags: ["Post"],
      summary: "자식 댓글 생성",
      security: {
        bearerAuth: [],
      },
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
                parentCommentId: {
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

export const updatePostSwagger = {
  "/post/:id": {
    patch: {
      tags: ["Post"],
      summary: "게시글을 수정합니다.",
      security: {
        bearerAuth: [],
      },
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
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
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

export const updateCommentSwagger = {
  "/post/comment/:commentId": {
    patch: {
      tags: ["Post"],
      summary: "댓글을 수정합니다.",
      security: {
        bearerAuth: [],
      },
      parameters: [
        {
          in: "path",
          name: "commentId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
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
