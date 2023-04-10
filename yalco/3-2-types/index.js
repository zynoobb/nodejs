const { ApolloServer } = require("apollo-server");
const _ = require("lodash");

// 불러와서 사용한다. nest와 크게 다르지 않음
const queries = require("./typedefs-resolvers/_queries");
const mutations = require("./typedefs-resolvers/_mutations");
const equipments = require("./typedefs-resolvers/equipments");
const supplies = require("./typedefs-resolvers/supplies");
const enums = require("./typedefs-resolvers/_enums");

// 배열로 쿼리, 뮤테이션, 타입을 index로 가져와 사용한다.
const typeDefs = [
  queries, //
  mutations, //
  enums, //
  equipments.typeDefs, //
  supplies.typeDefs, //
];

const resolvers = [
  equipments.resolvers, //
  supplies.resolvers, //
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
