const { gql } = require("apollo-server");
const dbWorks = require("../dbWorks.js");

// union 타입 여럿을 한 배열에 반환하고자 할 때 사용함
const typeDefs = gql`
  union Given = Equipment | Supply
`;
const resolvers = {
  Query: {
    givens: (parent, args) => {
      return [
        ...dbWorks.getEquipments(args), //
        ...dbWorks.getSupplies(args), //
      ];
    },
  },
  Given: {
    __resolveType(given, context, info) {
      if (given.used_by) {
        return "Equipment";
      }
      if (given.team) {
        return "Supply";
      }
      return null;
    },
  },
};
module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};

// GraphQL 에서 ...on [ query ] 로 작성
