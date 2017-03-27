import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat
} from 'graphql';

import Author from './author.js';
import AuthorsMap from '../data/authors.js';

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'コメント',
  fields: () => ({
    _id: {type: GraphQLString},
    content: {type: GraphQLString},
    author: {
      type: Author,
      resolve: function({author}) {
        return AuthorsMap[author];
      }
    },
    timestamp: {type: GraphQLFloat}
  })
});

export default Comment;


