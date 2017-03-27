import { GraphQLObjectType, GraphQLString } from 'graphql';

const Author = new GraphQLObjectType({
  name: 'Author',
  description: '記事の作者orコメントした人',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

export default Author;
