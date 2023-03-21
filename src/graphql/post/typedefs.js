import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(inputs: ApiFiltersInput): [Post!]!
  }

  union PostResult = PostNotFoundError | PostTimeoutError | Post

  # NÃO É POSSÍVEL ADICIONAR UMA INTERFACE EM UM UNION
  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type PostTimeoutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    #userId:
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
  }
`;
