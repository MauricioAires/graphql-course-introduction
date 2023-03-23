import { gql } from 'apollo-server';
import { apiFiltersResolvers, apiFiltersTypeDefs } from './api-filters';
import { postTypeDefs, postResolvers, PostsApi } from './post';
import { userTypeDefs, userResolvers, UsersApi } from './user';

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => 'hi root!',
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
];

export const dataSources = () => {
  return {
    postsApi: new PostsApi(),
    usersApi: new UsersApi(),
  };
};
