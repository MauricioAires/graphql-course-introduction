import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  # NOT: Todos os types definidos no type Query são chamados
  # de top level ou root resolver ou parent resolver
  extend type Query {
    post(id: ID!): Post!
    posts(inputs: ApiFiltersInput): [Post!]!
  }

  # union PostResult = PostNotFoundError | PostTimeoutError | Post

  # NOTE: NÃO É POSSÍVEL ADICIONAR UMA INTERFACE EM UM UNION
  # interface PostError {
  #   statusCode: Int!
  #   message: String!
  # }

  # type PostNotFoundError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   postId: String!
  # }

  # type PostTimeoutError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   timeout: Int!
  # }

  # NOTE: A diferença entre os root resolver (os types definidos diretamente na query)
  # e os trivial resolver (são os subtypes || os types não definidos na query)
  # é que os trivial resolver será executado para cada objeto retornando no
  # root resolver
  # Legal!!! O Resolver só será executado caso seja solicitado (definido na query frontend)
  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
    # unixTimestamp: String!
  }
`;
