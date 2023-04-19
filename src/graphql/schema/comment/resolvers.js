import { checkIsLoggedIn } from '../login/utils/auth-functions'

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

export const commentResolvers = {
  Mutation: {
    createComment
  },
  Comment: {
    user
  }
}
