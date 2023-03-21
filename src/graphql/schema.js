import { gql } from 'apollo-server';
import { apiFiltersTypeDefs } from './api-filters';
import { postTypeDefs, postResolvers } from './post';
import { userTypeDefs, userResolvers } from './user';

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
export const resolvers = [rootResolvers, userResolvers, postResolvers];
