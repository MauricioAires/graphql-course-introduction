import { PubSub } from 'graphql-subscriptions';

import { checkIsLoggedIn } from '../login/utils/auth-functions'

export const pubSub = new PubSub();

export const CREATED_COMMENT_TRIGGER = 'CREATED_COMMENT'

const createComment = async (obj, { data }, { dataSources, loggedUserId }, info) => {
  checkIsLoggedIn(loggedUserId)

  const { postId, comment } = data

  await dataSources.postsApi.getPost(postId) // throws if post does not exist

  return dataSources.commentDB.create({
    postId, comment, userId: loggedUserId
  })
}

//  FIELD RESOLVER
const user = async ({ user_id }, args, { dataSources }, info) => {
  const user = await dataSources.usersApi.userDataLoaderPostId(user_id)

  return user;
}

const createdComment = {
  subscribe: () => pubSub.asyncIterator(CREATED_COMMENT_TRIGGER)
}

export const commentResolvers = {
  Mutation: { createComment },
  Subscription: { createdComment },
  Comment: { user }
}
