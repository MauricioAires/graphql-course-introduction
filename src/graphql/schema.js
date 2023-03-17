import { gql } from 'apollo-server';
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

export const typeDefs = [userTypeDefs, rootTypeDefs];
export const resolvers = [rootResolvers, userResolvers];
