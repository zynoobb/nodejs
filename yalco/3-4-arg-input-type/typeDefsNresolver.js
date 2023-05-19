const queries = require("./typedefs-resolvers/_queries");
const mutations = require("./typedefs-resolvers/_mutations");
const enums = require("./typedefs-resolvers/_enums");
const equipments = require("./typedefs-resolvers/equipments");
const softwares = require("./typedefs-resolvers/softwares");
const supplies = require("./typedefs-resolvers/supplies");
const givens = require("./typedefs-resolvers/givens");
const tools = require("./typedefs-resolvers/tools");
const people = require("./typedefs-resolvers/people");

const typeDefs = [
  queries,
  mutations,
  enums,
  equipments.typeDefs,
  softwares.typeDefs,
  supplies.typeDefs,
  givens.typeDefs,
  tools.typeDefs,
  people.typeDefs,
];

const resolvers = [
  equipments.resolvers,
  softwares.resolvers,
  supplies.resolvers,
  givens.resolvers,
  tools.resolvers,
  people.resolvers,
];

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
