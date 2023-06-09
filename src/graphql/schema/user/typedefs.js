import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(inputs: ApiFiltersInput): [User!]!
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(userId: ID!, data: UpdateUserInput!): User!
    deleteUser(userId: ID!): Boolean!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
    password: String
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
  }
`;
