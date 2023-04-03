import { checkOwner } from '../login/utils/auth-functions'

/*****************************************
 *  QUERIES RESOLVERS
 *****************************************/

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

/*****************************************
 *  MUTATION RESOLVERS
 *****************************************/

const createUser = async (obj, { data }, { dataSources }, info) => {
  return dataSources.usersApi.createUser(data);
};

const updateUser = async (obj, { userId, data }, { dataSources, loggedUserId }, info) => {

  checkOwner(userId, loggedUserId)

  return dataSources.usersApi.updateUser(userId, data);
};

const deleteUser = async (obj, { userId }, { dataSources, loggedUserId }, info) => {

  checkOwner(userId, loggedUserId)

  return dataSources.usersApi.deleteUser(userId);
};

/*****************************************
 *  FIELD RESOLVERS
 *****************************************/

const posts = async (obj, arg, { dataSources }, info) => {
  const { id } = obj;

  return dataSources.postsApi.postDataLoaderUserId(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },

  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },

  User: {
    posts,
  },
};
