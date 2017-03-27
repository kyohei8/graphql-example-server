import { GraphQLEnumType } from 'graphql';

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

export default Category;
