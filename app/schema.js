const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

const Query = new GraphQLObjectType({
  name: 'baseSchema',
  fields : {
    ping: {
      type: GraphQLString,
      resolve: () => 'pong'
    }
  }
});

const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;
