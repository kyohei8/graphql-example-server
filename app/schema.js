import _ from 'lodash';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import PostsList from './data/posts.js';

import Category from './types/category.js';
import Post from './types/post.js';

const Query = new GraphQLObjectType({
  name: 'baseSchema',
  fields : {
    posts: {
      type: new GraphQLList(Post),
      description: 'List of posts in the blog',
      args: {
        category: {type: Category}
      },
      resolve: function(source, {category}) {
        if(category) {
          return _.filter(PostsList, post => post.category === category);
        } else {
          return PostsList;
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;
