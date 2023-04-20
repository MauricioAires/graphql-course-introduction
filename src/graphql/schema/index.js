import { gql } from 'apollo-server';

import { knex } from '../../knex'

import { apiFiltersResolvers, apiFiltersTypeDefs } from './api-filters';
import { loginTypeDefs, loginResolvers, LoginApi, } from './login';
import { postTypeDefs, postResolvers, PostsApi } from './post';
import { userTypeDefs, userResolvers, UsersApi } from './user';
import { commentTypeDefs, commentResolvers, CommentSQLDataSource } from './comment'

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }

  type Mutation {
    _root: Boolean
  }

  type Subscription {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => 'hi root!',
  },
  Mutation: {
    _root: () => 'hi root!',
  },
  Subscription: {
    _root: () => 'hi root!',
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  loginTypeDefs,
  apiFiltersTypeDefs,
  commentTypeDefs
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  loginResolvers,
  apiFiltersResolvers,
  commentResolvers
];

export const dataSources = () => {
  return {
    postsApi: new PostsApi(),
    usersApi: new UsersApi(),
    loginApi: new LoginApi(),
    commentDB: new CommentSQLDataSource(knex)
  };
};
