import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} from 'graphql';

import Comment from './comment.js';
import Author from './author.js';
import Category from './category.js';

import CommentList from '../data/comments.js';
import AuthorsMap from '../data/authors.js';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Represent the type of a blog post',
  fields: () => ({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    category: {type: Category},
    summary: {type: GraphQLString},
    content: {type: GraphQLString},
    timestamp: {
      type: GraphQLFloat,
      resolve: function(post) {
        if(post.date) {
          return new Date(post.date['$date']).getTime();
        } else {
          return null;
        }
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      args: {
        limit: {
          type: GraphQLInt,
          description: 'Limit the comments returing'
        }
      },
      resolve: function(post, {limit}) {
        if(limit >= 0) {
          return CommentList.slice(0, limit);
        }

        return CommentList;
      }
    },
    author: {
      type: Author,
      resolve: function({author}) {
        return AuthorsMap[author];
      }
    }
  })
});

export default Post;
