import { gql } from "apollo-server";


export const commentTypeDefs = gql`
  extend type Mutation {
    createComment(data: CreateCommentInput ): Comment!
  }

  extend type Subscription {
    createdComment: Comment!
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
    createdAt:  String!
  }

  input CreateCommentInput  {
    comment: String!
    postId: String!
  }
`
