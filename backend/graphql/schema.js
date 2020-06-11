const { GraphQLObjectType ,GraphQLSchema, GraphQLString } = require('graphql');
const { resolveFieldValueOrError } = require('graphql/execution/execute');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    test: {
      type: GraphQLString,
      resolve(parent, args) {
        return "TEST GRAPHQL QUERY";
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
