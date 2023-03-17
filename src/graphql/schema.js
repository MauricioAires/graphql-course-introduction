import { gql } from 'apollo-server';

const rootTypeDeft = gql`
  type Query {
    hi: String
  }
`;

const rootResolvers = {
  Query: {
    hi: () => 'hi again',
  },
};

export const typeDefs = [rootTypeDeft];
export const resolvers = [rootResolvers];
