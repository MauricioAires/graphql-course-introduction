import { AuthenticationError, ValidationError } from 'apollo-server';

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);

  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError(`You have to send title, body and userId`);
  }

  return await dataSource.post('', { ...postInfo });
};

export const findPostOwner = async (postId, dataSource) => {
  /**
 * NOTE: é muito importante que tome cuidado com cache durante
 * update e delete, dessa forma não é utilizado a função do data source
 * é chamado direto do banco de dados/api
 */

  const foundPost = await dataSource.get(postId, undefined, {
    cacheOptions: {
      ttl: 0
    }
  });

  if (!foundPost) {
    throw new ValidationError(`Post ${postId} does not exist`);
  }

  if (foundPost.userId !== dataSource.context.loggedUserId) {
    throw new AuthenticationError(`You cannot update this post!`);
  }

  return foundPost;

}

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) {
    throw new ValidationError(`Missing postId`);
  }


  const { userId } = await findPostOwner(postId, dataSource);
  const { title, body } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError(`title missing`);
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError(`body missing`);
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError(`userId missing`);
    }

    await userExists(userId, dataSource);
  }

  return await dataSource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError(`Missing postId`);
  }

  await findPostOwner(postId, dataSource);

  const deleted = await dataSource.delete(postId);

  return !!deleted;
};
const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.usersApi.get(userId);
  } catch (error) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const indexRefPost = await dataSource.get('', {
    limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toUTCString(),
  };
};
