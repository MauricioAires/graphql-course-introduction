/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, { inputs }, { dataSources }, info) => {
  const data = dataSources.usersApi.getUsers(inputs);

  return data;
};

/**
 *
 * @param {*} obj
 * @param {*} arg são os dados que são passados via props na query
 * @param {*} params
 * @returns
 */
const user = async (obj, { id }, { dataSources }) => {
  const data = dataSources.usersApi.getUser(id);

  return data;
};

const posts = async (obj, arg, { dataSources }, info) => {
  const { id } = obj;

  return dataSources.postsApi.postDataLoaderUserId(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
