/**
 *
 * @param {*} obj
 * @param {*} arg
 * @param {*} context é utilizado para compartilhar através de todos
 * os resolvers
 * @returns
 */
const users = async (obj, arg, { api }, info) => {
  const response = await api.get('/users');
  const { data } = response;

  return data;
};

/**
 *
 * @param {*} obj
 * @param {*} arg são os dados que são passados via props na query
 * @param {*} params
 * @returns
 */
const user = async (obj, { id }, { api }) => {
  const response = await api.get(`/users/${id}`);
  const { data } = response;

  return data;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
