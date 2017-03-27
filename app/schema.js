import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} from 'graphql';

import PostsList from './data/posts.js';
import AuthorsMap from './data/authors.js';
import {CommentList} from './data/comments.js';

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'ブログのカテゴリ',
  values: {
    METEOR: {value: 'meteor'},
    PRODUCT: {value: 'product'},
    USER_STORY: {value: 'user-story'},
    OTHER: {value: 'other'}
  }
});

const Author = new GraphQLObjectType({
  name: 'Author',
  description: '記事の作者orコメントした人',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

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
        limit: {type: GraphQLInt, description: 'Limit the comments returing'}
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
