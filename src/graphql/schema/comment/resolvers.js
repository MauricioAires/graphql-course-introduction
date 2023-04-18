

const createComment = async (obj, { data }, context, info) => {

  const { postId, comment } = data

  console.log(postId, comment)
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
